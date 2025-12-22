pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        BASE_URL = 'https://www.saucedemo.com'
    }
    
    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'firefox', 'edge', 'all'],
            description: 'Browser to run tests on'
        )
        choice(
            name: 'TEST_SUITE',
            choices: ['smoke', 'regression', 'all'],
            description: 'Test suite to execute'
        )
        string(
            name: 'TAG_EXPRESSION',
            defaultValue: '@smoke',
            description: 'Cucumber tag expression (e.g., @smoke, @regression)'
        )
        booleanParam(
            name: 'HEADLESS',
            defaultValue: true,
            description: 'Run tests in headless mode'
        )
        booleanParam(
            name: 'CLEAN_BUILD',
            defaultValue: true,
            description: 'Clean previous reports before running'
        )
        booleanParam(
            name: 'PARALLEL_EXECUTION',
            defaultValue: false,
            description: 'Run tests on multiple browsers in parallel'
        )
    }
    
    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "🔄 Checking out code..."
                    checkout scm
                }
            }
        }
        
        stage('Setup Environment') {
            steps {
                script {
                    echo "🔧 Setting up environment..."
                    sh '''
                        echo "Node version: $(node --version)"
                        echo "NPM version: $(npm --version)"
                        echo "Browser: ${BROWSER}"
                        echo "Test Suite: ${TEST_SUITE}"
                        echo "Headless: ${HEADLESS}"
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    echo "📦 Installing dependencies..."
                    sh 'npm ci'
                }
            }
        }
        
        stage('Clean Previous Reports') {
            when {
                expression { return params.CLEAN_BUILD }
            }
            steps {
                script {
                    echo "🧹 Cleaning previous reports..."
                    sh 'npm run clean'
                }
            }
        }
        
        stage('Run Tests - Chrome') {
            when {
                expression { 
                    return params.BROWSER == 'chrome' || params.BROWSER == 'all' 
                }
            }
            steps {
                script {
                    echo "🧪 Running Chrome tests..."
                    sh """
                        export HEADLESS=${params.HEADLESS}
                        export BASE_URL=${BASE_URL}
                        
                        if [ "${params.TEST_SUITE}" = "smoke" ]; then
                            npm run test:smoke
                        elif [ "${params.TEST_SUITE}" = "regression" ]; then
                            npm run test:regression
                        else
                            npm run test:chrome -- --cucumberOpts.tagExpression='${params.TAG_EXPRESSION}'
                        fi
                    """
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'screenshots/**/*.png', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
                }
            }
        }
        
        stage('Run Tests - Firefox') {
            when {
                expression { 
                    return params.BROWSER == 'firefox' || params.BROWSER == 'all' 
                }
            }
            steps {
                script {
                    echo "🦊 Running Firefox tests..."
                    sh """
                        export HEADLESS=${params.HEADLESS}
                        export BASE_URL=${BASE_URL}
                        
                        if [ "${params.TEST_SUITE}" = "smoke" ]; then
                            npm run test:firefox -- --cucumberOpts.tagExpression='@smoke'
                        elif [ "${params.TEST_SUITE}" = "regression" ]; then
                            npm run test:firefox -- --cucumberOpts.tagExpression='@regression'
                        else
                            npm run test:firefox -- --cucumberOpts.tagExpression='${params.TAG_EXPRESSION}'
                        fi
                    """
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'screenshots/**/*.png', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
                }
            }
        }
        
        stage('Run Tests - Edge') {
            when {
                expression { 
                    return params.BROWSER == 'edge' || params.BROWSER == 'all' 
                }
            }
            steps {
                script {
                    echo "🌐 Running Edge tests..."
                    sh """
                        export HEADLESS=${params.HEADLESS}
                        export BASE_URL=${BASE_URL}
                        
                        if [ "${params.TEST_SUITE}" = "smoke" ]; then
                            npm run test:edge -- --cucumberOpts.tagExpression='@smoke'
                        elif [ "${params.TEST_SUITE}" = "regression" ]; then
                            npm run test:edge -- --cucumberOpts.tagExpression='@regression'
                        else
                            npm run test:edge -- --cucumberOpts.tagExpression='${params.TAG_EXPRESSION}'
                        fi
                    """
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'screenshots/**/*.png', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
                }
            }
        }
        
        stage('Run Parallel Tests') {
            when {
                expression { return params.PARALLEL_EXECUTION }
            }
            steps {
                script {
                    echo "🚀 Running parallel tests on multiple browsers..."
                    sh """
                        export HEADLESS=${params.HEADLESS}
                        export BASE_URL=${BASE_URL}
                        npm run test:parallel
                    """
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'screenshots/**/*.png', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'logs/**/*.log', allowEmptyArchive: true
                }
            }
        }
        
        stage('Generate Reports') {
            steps {
                script {
                    echo "📊 Generating Allure report..."
                    sh '''
                        allure generate allure-results --clean -o allure-report || true
                    '''
                }
            }
        }
        
        stage('Publish Reports') {
            steps {
                script {
                    echo "📈 Publishing reports..."
                    
                    // Archive reports
                    archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
                    
                    // Publish Allure Report
                    allure includeProperties: false,
                           jdk: '',
                           results: [[path: 'allure-results']]
                }
            }
        }
        
        stage('Performance Analysis') {
            steps {
                script {
                    echo "⏱️ Analyzing test performance..."
                    sh '''
                        echo "Test Duration Analysis:"
                        if [ -f "logs/combined.log" ]; then
                            grep -i "duration\\|time\\|seconds" logs/combined.log | tail -20 || true
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        always {
            script {
                echo "🧹 Cleanup..."
                
                // Calculate test metrics
                def testResults = [
                    browser: params.BROWSER,
                    suite: params.TEST_SUITE,
                    headless: params.HEADLESS,
                    buildNumber: env.BUILD_NUMBER,
                    buildUrl: env.BUILD_URL
                ]
                
                echo "Test Results: ${testResults}"
            }
        }
        
        success {
            script {
                echo "✅ Tests passed successfully!"
                
                // Send success notification
                emailext(
                    subject: "✅ Tests PASSED - Build #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Test Execution Successful</h2>
                        <p><b>Browser:</b> ${params.BROWSER}</p>
                        <p><b>Test Suite:</b> ${params.TEST_SUITE}</p>
                        <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                        <p><b>URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        <p><b>Allure Report:</b> <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a></p>
                    """,
                    to: '${DEFAULT_RECIPIENTS}',
                    mimeType: 'text/html'
                )
            }
        }
        
        failure {
            script {
                echo "❌ Tests failed!"
                
                // Send failure notification
                emailext(
                    subject: "❌ Tests FAILED - Build #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Test Execution Failed</h2>
                        <p><b>Browser:</b> ${params.BROWSER}</p>
                        <p><b>Test Suite:</b> ${params.TEST_SUITE}</p>
                        <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                        <p><b>URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        <p><b>Console:</b> <a href="${env.BUILD_URL}console">${env.BUILD_URL}console</a></p>
                        <p><b>Allure Report:</b> <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a></p>
                        <p>Check screenshots and logs for details.</p>
                    """,
                    to: '${DEFAULT_RECIPIENTS}',
                    mimeType: 'text/html'
                )
            }
        }
        
        unstable {
            script {
                echo "⚠️ Tests are unstable!"
                
                emailext(
                    subject: "⚠️ Tests UNSTABLE - Build #${env.BUILD_NUMBER}",
                    body: """
                        <h2>Test Execution Unstable</h2>
                        <p><b>Browser:</b> ${params.BROWSER}</p>
                        <p><b>Test Suite:</b> ${params.TEST_SUITE}</p>
                        <p><b>Build:</b> #${env.BUILD_NUMBER}</p>
                        <p><b>URL:</b> <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                        <p><b>Allure Report:</b> <a href="${env.BUILD_URL}allure">${env.BUILD_URL}allure</a></p>
                        <p>Some tests may have failed or been skipped.</p>
                    """,
                    to: '${DEFAULT_RECIPIENTS}',
                    mimeType: 'text/html'
                )
            }
        }
    }
}
