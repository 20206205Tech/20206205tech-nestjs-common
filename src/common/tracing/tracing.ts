import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_DEPLOYMENT_ENVIRONMENT_NAME } from '@opentelemetry/semantic-conventions';

const traceExporter = new OTLPTraceExporter({
  url: 'https://api.honeycomb.io/v1/traces',
  headers: {
    'x-honeycomb-team': process.env.HONEYCOMB_API_KEY ?? '',
  },
});

let sdk: NodeSDK | null = null;
let isStarted = false;

/**
 * Khởi tạo Tracing với OpenTelemetry
 * @param serviceName Tên của service (ví dụ: 'code-payment-service')
 */
export const initTracing = (serviceName: string) => {
  if (isStarted) return;

  const environment = process.env.ENVIRONMENT ?? 'production';

  sdk = new NodeSDK({
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()],
    serviceName,
    resource: resourceFromAttributes({
      [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: environment,
    }),
  });

  sdk.start();
  isStarted = true;
  console.log(`[Tracing] Initialized for ${serviceName} (${environment})`);

  // Đảm bảo đóng SDK khi app tắt để giải phóng tài nguyên
  process.on('SIGTERM', () => {
    void sdk
      ?.shutdown()
      .then(() => console.log('[Tracing] Terminated'))
      .finally(() => process.exit(0));
  });
};
