/**
 * Safe logging utility for React Native that doesn't interfere with ExceptionsManager
 * 
 * This logger provides safe logging methods that work in both development and production
 * without causing cascading errors in error boundaries or interfering with React Native's
 * internal error handling systems.
 */

interface LogEntry {
  timestamp: number;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
  component?: string;
}

class SafeLogger {
  private logs: LogEntry[] = [];
  private maxLogs = 100;

  private addLog(level: 'info' | 'warn' | 'error', message: string, data?: any, component?: string) {
    const entry: LogEntry = {
      timestamp: Date.now(),
      level,
      message,
      data,
      component,
    };

    // Keep only recent logs to prevent memory issues
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // In development, safely output to console outside of error boundary context
    if (__DEV__) {
      // Use setTimeout to avoid immediate console calls that might interfere with error boundaries
      setTimeout(() => {
        try {
          const prefix = component ? `[${component}]` : '[SafeLogger]';
          const timestamp = new Date(entry.timestamp).toISOString();
          
          switch (level) {
            case 'info':
              if (console.info) {
                console.info(`${timestamp} ${prefix} ${message}`, data || '');
              }
              break;
            case 'warn':
              if (console.warn) {
                console.warn(`${timestamp} ${prefix} ${message}`, data || '');
              }
              break;
            case 'error':
              if (console.error) {
                console.error(`${timestamp} ${prefix} ${message}`, data || '');
              }
              break;
          }
        } catch (e) {
          // Silent fail to prevent cascading errors
        }
      }, 0);
    }
  }

  info(message: string, data?: any, component?: string) {
    this.addLog('info', message, data, component);
  }

  warn(message: string, data?: any, component?: string) {
    this.addLog('warn', message, data, component);
  }

  error(message: string, data?: any, component?: string) {
    this.addLog('error', message, data, component);
  }

  // Get logs for debugging (safe to call anytime)
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  // Get recent logs by level
  getLogsByLevel(level: 'info' | 'warn' | 'error', limit = 10): LogEntry[] {
    return this.logs
      .filter(log => log.level === level)
      .slice(-limit);
  }

  // Clear logs
  clearLogs() {
    this.logs = [];
  }

  // Get formatted logs for display
  getFormattedLogs(limit = 20): string {
    return this.logs
      .slice(-limit)
      .map(log => {
        const timestamp = new Date(log.timestamp).toISOString();
        const prefix = log.component ? `[${log.component}]` : '';
        const dataStr = log.data ? ` | ${JSON.stringify(log.data)}` : '';
        return `${timestamp} [${log.level.toUpperCase()}] ${prefix} ${log.message}${dataStr}`;
      })
      .join('\n');
  }
}

// Create singleton instance
const safeLogger = new SafeLogger();

export default safeLogger;