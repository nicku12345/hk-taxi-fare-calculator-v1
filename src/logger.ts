class Logger {
  static debug(...message: Parameters<typeof console.log>): void {
    console.log(`[DEBUG] ${new Date().toISOString()}:`, ...message);
  }

  static info(...message: Parameters<typeof console.info>): void {
    console.info(`[INFO] ${new Date().toISOString()}:`, ...message);
  }

  static warn(...message: Parameters<typeof console.warn>): void {
    console.warn(`[WARN] ${new Date().toISOString()}:`, ...message);
  }

  static error(...message: Parameters<typeof console.error>): void {
    console.error(`[ERROR] ${new Date().toISOString()}:`, ...message);
  }
}

export default Logger;