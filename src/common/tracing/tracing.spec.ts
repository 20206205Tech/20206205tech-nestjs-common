/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-require-imports */

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NodeSDK } from '@opentelemetry/sdk-node';

jest.mock('@opentelemetry/sdk-node', () => ({
  NodeSDK: jest.fn().mockImplementation(() => ({
    start: jest.fn(),
    shutdown: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('@opentelemetry/auto-instrumentations-node', () => ({
  getNodeAutoInstrumentations: jest.fn(),
}));

jest.mock('@opentelemetry/exporter-trace-otlp-proto', () => ({
  OTLPTraceExporter: jest.fn(),
}));

describe('Tracing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize tracing correctly', () => {
    jest.isolateModules(() => {
      const { initTracing } =
        require('./tracing') as typeof import('./tracing');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      initTracing('test-service');

      expect(NodeSDK).toHaveBeenCalledWith(
        expect.objectContaining({
          serviceName: 'test-service',
        }),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        '[Tracing] Initialized for test-service',
      );

      consoleSpy.mockRestore();
    });
  });

  it('should not initialize tracing twice', () => {
    jest.isolateModules(() => {
      const { initTracing } =
        require('./tracing') as typeof import('./tracing');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      initTracing('service-1');
      jest.clearAllMocks();
      initTracing('service-2');

      expect(NodeSDK).not.toHaveBeenCalled();
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  it('should handle SIGTERM signal for graceful shutdown', async () => {
    await jest.isolateModulesAsync(async () => {
      const { initTracing } =
        require('./tracing') as typeof import('./tracing');
      const onSpy = jest.spyOn(process, 'on').mockImplementation();
      const exitSpy = jest.spyOn(process, 'exit').mockImplementation();
      const logSpy = jest.spyOn(console, 'log').mockImplementation();

      initTracing('test-shutdown');

      const sigtermCall = onSpy.mock.calls.find(
        (call) => call[0] === 'SIGTERM',
      );
      expect(sigtermCall).toBeDefined();

      if (sigtermCall) {
        const sigtermCallback = sigtermCall[1] as () => void;
        const mockSdkInstance = (NodeSDK as jest.Mock).mock.results[0].value;

        // Trigger SIGTERM
        sigtermCallback();

        // Wait for the async chain (shutdown -> then -> finally)
        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(mockSdkInstance.shutdown).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('[Tracing] Terminated');
        expect(exitSpy).toHaveBeenCalledWith(0);
      }

      onSpy.mockRestore();
      exitSpy.mockRestore();
      logSpy.mockRestore();
    });
  });
});
