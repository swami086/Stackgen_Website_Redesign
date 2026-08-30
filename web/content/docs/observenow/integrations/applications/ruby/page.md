---
title: "Ruby Tracing Instrumentation"
product: "observenow"
sourcePath: "/observenow/integrations/applications/ruby"
sourceUrl: "https://docs.stackgen.com/observenow/integrations/applications/ruby"
status: "ok"
---

## Ruby Tracing Instrumentation

### Ruby >= v2.5

OpenTelemetry is the recommended approach to instrument for tracing. Please follow the instructions below to achieve auto-instrumentation:

- [OpenTelemetry Ruby Instrumentation Packages](https://opentelemetry.io/docs/instrumentation/ruby/automatic/)

In the example above

**Gemfile**

```ruby
gem 'opentelemetry-sdk'

gem 'opentelemetry-exporter-otlp'

gem 'opentelemetry-instrumentation-all'
```

**config/initializers/opentelemetry.rb**

```ruby
require 'opentelemetry/sdk'

require 'opentelemetry/exporter/otlp'

require 'opentelemetry/instrumentation/all'

OpenTelemetry::SDK.configure do |c|

  c.service_name = 'sample-app'

  c.use_all() # enables all instrumentation!

end
```

### Ruby < v2.5

OpenTelemetry libraries do not support Ruby version less than 2.5. To get auto-instrumentation in this situation, we recommend using [OpenCensus](https://github.com/census-instrumentation/opencensus-ruby) (which was later merged into OpenTelemetry) with the Jaeger exporter until you are able to upgrade.

Here is a sample Rails app auto instrumented:

**Gemfile**

```ruby
gem "opencensus"

gem "opencensus-jaeger"
```

**config/application.rb file**

```ruby
require 'rails/all'

require "opencensus/trace/integrations/rails"



 # Require the gems listed in Gemfile, including any gems

 # you've limited to :test, :development, or :production.

@@ -14,5 +16,20 @@ module SampleApp



     ...

    config.opencensus.trace.default_sampler = OpenCensus::Trace::Samplers::Probability.new(0.5)

    config.opencensus.trace.exporter = OpenCensus::Trace::Exporters::JaegerExporter.new(

      service_name: 'sample-app',

      host: 'localhost', # because otel-collector is running

      port: '6831', # because otel-collector is running

      protocol_class: ::Thrift::CompactProtocol # currently supporting only compact protocol

    )
```

- [Ruby Tracing Instrumentation](/docs/observenow/integrations/applications/ruby#ruby-tracing-instrumentation)
  - [Ruby >= v2.5](/docs/observenow/integrations/applications/ruby#ruby--v25)
  - [Ruby < v2.5](/docs/observenow/integrations/applications/ruby#ruby--v25-1)
