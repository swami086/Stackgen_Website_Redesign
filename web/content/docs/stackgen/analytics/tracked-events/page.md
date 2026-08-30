---
title: "Automatic Events"
product: "stackgen"
sourcePath: "/docs/analytics/tracked-events"
sourceUrl: "https://docs.stackgen.com/docs/analytics/tracked-events"
status: "ok"
---

This document lists all the analytics events tracked in the StackGen documentation site.

## Automatic Events

These events are tracked automatically:

| Event Name | Description | Properties |
| --- | --- | --- |
| `[Amplitude] Page Viewed` | Tracked when a user views a page | `page_path`, `page_title`, `page_url` |
| `[Amplitude] Form Submitted` | Tracked when a user submits a form | `form_id`, `form_name` |
| `[Amplitude] File Downloaded` | Tracked when a user downloads a file | `file_name`, `file_extension` |
| `[Amplitude] Session Start` | Tracked when a new session begins | - |
| `[Amplitude] Session End` | Tracked when a session ends | - |

## Custom Events

These events are tracked specifically for StackGen documentation:

| Event Name | Description | Properties |
| --- | --- | --- |
| `page_viewed` | Tracked when a page is viewed | `page_path`, `page_title` |
| `Navigation: [section_title]` | Tracked when a user navigates using hash links | `hash`, `hash_text`, `section_title`, `page_path`, `page_title`, `event_category` |
| `Outbound Link: [domain] - [link_text]` | Tracked when a user clicks on an external link | `link_url`, `link_text`, `domain`, `is_stackgen`, `page_path`, `event_category` |
| `search_opened` | Tracked when a user opens the search interface | `page_path` |
| `search_query` | Tracked when a user enters a search query | `search_term`, `page_path` |
| `search_result_click` | Tracked when a user clicks on a search result | `result_text`, `position` |

## Adding New Events

When adding new events to the documentation site, please update this document with:

1. The event name
2. A description of when the event is triggered
3. The properties included with the event

This helps maintain a clear record of all analytics tracking implemented in the documentation.
