---
title: "Contact Points"
product: "observenow"
sourcePath: "/observenow/alerting/contact-points"
sourceUrl: "https://docs.stackgen.com/observenow/alerting/contact-points"
status: "ok"
---

Contact Points are used to configure the medium of notification, whenever an alert is triggered. This medium can be applications like slack, email, webhook etc. To create a contact point, use the following steps:

1. Navigate to **Alerting** → **Contact Points** in the menu on the left.
2. Click on **\+ Add contact point** button.
3. Give a name to the contact point.
4. Select an **Integration** from the options in the drop down. For a list of supported integrations [click here](https://grafana.com/docs/grafana/latest/alerting/fundamentals/contact-points/#supported-contact-point-integrations).
5. Configure the additional settings based on the integration selected.
6. One or more than one integration can created for a contact point.
7. Test the contact point and click on **Save contact point** to save the contact point.

The contact point can be edited at will but only be deleted if it isn't used in any of the existing notification policy.
