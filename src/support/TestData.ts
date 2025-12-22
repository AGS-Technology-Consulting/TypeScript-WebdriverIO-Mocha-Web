export class TestData {
  /**
   * Generate random email
   */
  static generateRandomEmail(domain: string = 'test.com'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `test_${timestamp}_${random}@${domain}`;
  }

  /**
   * Generate random username
   */
  static generateRandomUsername(prefix: string = 'user'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${prefix}_${timestamp}_${random}`;
  }

  /**
   * Generate random password
   */
  static generateRandomPassword(length: number = 12): string {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=';
    const all = uppercase + lowercase + numbers + special;
    
    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];
    
    for (let i = 4; i < length; i++) {
      password += all[Math.floor(Math.random() * all.length)];
    }
    
    return password.split('').sort(() => Math.random() - 0.5).join('');
  }

  /**
   * SauceDemo - Standard User
   */
  static getStandardUser() {
    return {
      username: 'standard_user',
      password: 'secret_sauce'
    };
  }

  /**
   * SauceDemo - Locked Out User
   */
  static getLockedOutUser() {
    return {
      username: 'locked_out_user',
      password: 'secret_sauce'
    };
  }

  /**
   * SauceDemo - Problem User
   */
  static getProblemUser() {
    return {
      username: 'problem_user',
      password: 'secret_sauce'
    };
  }

  /**
   * SauceDemo - Performance Glitch User
   */
  static getPerformanceUser() {
    return {
      username: 'performance_glitch_user',
      password: 'secret_sauce'
    };
  }

  /**
   * Invalid credentials
   */
  static getInvalidCredentials() {
    return {
      username: 'invalid_user',
      password: 'wrong_password'
    };
  }

  /**
   * Product names for SauceDemo
   */
  static getProductNames(): string[] {
    return [
      'sauce-labs-backpack',
      'sauce-labs-bike-light',
      'sauce-labs-bolt-t-shirt',
      'sauce-labs-fleece-jacket',
      'sauce-labs-onesie',
      'test.allthethings()-t-shirt-(red)'
    ];
  }
}

export default TestData;
