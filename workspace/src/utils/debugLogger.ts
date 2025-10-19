/**
 * Development debugging utility for viewing safe logger output
 * 
 * This utility provides a safe way to access and display logging information
 * during development without interfering with React Native's error handling.
 * 
 * Usage in development:
 * import debugLogger from '../utils/debugLogger';
 * debugLogger.viewRecentLogs(); // View in console (safely)
 * debugLogger.getErrorSummary(); // Get error summary
 */

import safeLogger from './safeLogger';

class DebugLogger {
  /**
   * Safely view recent logs in console (development only)
   */
  viewRecentLogs(limit = 20) {
    if (!__DEV__) {
      return;
    }

    try {
      const logs = safeLogger.getLogs().slice(-limit);
      if (logs.length === 0) {
        // Use a safe async console call
        setTimeout(() => {
          if (console.info) {
            console.info('[DebugLogger] No logs available');
          }
        }, 0);
        return;
      }

      setTimeout(() => {
        if (console.group && console.groupEnd && console.info) {
          console.group(`[DebugLogger] Recent ${logs.length} logs`);
          logs.forEach(log => {
            const timestamp = new Date(log.timestamp).toLocaleTimeString();
            const prefix = log.component ? `[${log.component}]` : '';
            const dataStr = log.data ? JSON.stringify(log.data) : '';
            console.info(`${timestamp} [${log.level.toUpperCase()}] ${prefix} ${log.message} ${dataStr}`);
          });
          console.groupEnd();
        }
      }, 0);
    } catch (error) {
      // Silent fail to prevent debugging from causing issues
    }
  }

  /**
   * Get error logs summary
   */
  getErrorSummary() {
    const errorLogs = safeLogger.getLogsByLevel('error', 10);
    return {
      errorCount: errorLogs.length,
      recentErrors: errorLogs.map(log => ({
        timestamp: new Date(log.timestamp).toISOString(),
        component: log.component,
        message: log.message,
        data: log.data
      }))
    };
  }

  /**
   * Get navigation-specific logs
   */
  getNavigationLogs() {
    const logs = safeLogger.getLogs();
    return logs.filter(log => 
      log.component?.includes('Navigation') || 
      log.component === 'HomeScreen' ||
      log.component === 'MembershipPortalDemo'
    );
  }

  /**
   * Clear all logs (development only)
   */
  clearLogs() {
    if (__DEV__) {
      safeLogger.clearLogs();
      setTimeout(() => {
        if (console.info) {
          console.info('[DebugLogger] Logs cleared');
        }
      }, 0);
    }
  }

  /**
   * Get formatted logs as string (safe for display in UI)
   */
  getFormattedLogs(limit = 20): string {
    return safeLogger.getFormattedLogs(limit);
  }

  /**
   * Export logs for external debugging
   */
  exportLogs() {
    if (!__DEV__) {
      return null;
    }

    const summary = {
      timestamp: new Date().toISOString(),
      totalLogs: safeLogger.getLogs().length,
      errorSummary: this.getErrorSummary(),
      navigationLogs: this.getNavigationLogs(),
      allLogs: safeLogger.getLogs()
    };

    return summary;
  }
}

// Create singleton instance
const debugLogger = new DebugLogger();

export default debugLogger;