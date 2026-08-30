---
title: "In-ProgressPolicies for Complex Objects Are Completely Evaluated"
product: "stackgen"
sourcePath: "/docs/help-center/known-issues/aug2025"
sourceUrl: "https://docs.stackgen.com/docs/help-center/known-issues/aug2025"
status: "ok"
---

We've listed all the Known Issues for the August 2025 release here. Once these issues are resolved in a future release, they will be included under the Bug Fixes section of the [Release Notes](/docs/stackgen/release-notes/aip/archive/2025/aug25-release).

- [Policies for Complex Objects Are Completely Evaluated](/docs/stackgen/help-center/known-issues/aug2025#in-progresspolicies-for-complex-objects-are-completely-evaluated)
- [Validating Topology Loader Keeps Running](/docs/stackgen/help-center/known-issues/aug2025#fixed-validating-topology-loader-keeps-running)

### In-ProgressPolicies for Complex Objects Are Completely Evaluated

Click to view

**Summary**: While scanning resources with complex object types (for example, `google_compute_instance` from the list of modules under the **Catalog** page), only a subset of policies are evaluated. For instance, although five policies were defined for the `google_compute_instance`, only two will be evaluated.

![failed policies](https://docs.stackgen.com/assets/images/failedpoliciesaug25-aa05a00fa1ceca5487fc070a011e2dd8.png)

**Cause**: The StackGen evaluation engine did not fully support parsing and handling of complex object attributes. As a result, policies referencing these attributes are getting skipped during scans.

**Workaround**: This is a known limitation. Full evaluation of complex object types is not yet supported. We are tracking this issue and will provide updates in a future release once support is added. At present, we recommend defining policies on supported simple attributes to ensure they are evaluated during scans.

### Fixed Validating Topology Loader Keeps Running

Click to view

**Issue**: While creating an **appStack From Scratch** in StackGen, the `Validating Topology` loader continues to run in the background even after the **Add Resources window** is opened.

![Topology validation loader](https://docs.stackgen.com/assets/images/validatingloaderaug2025-8443424633cda485a021abb974361058.png)

**Cause**: The loader process is not being cleared correctly when no resources are present in a newly created appStack. This results in the loader remaining visible behind the active window.

**Fix**: This issue has been fixed in [September 2025 release](/docs/stackgen/release-notes/aip/archive/2025/sep25-release#validating-topology-loader-keeps-running).
