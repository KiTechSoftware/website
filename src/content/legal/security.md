---
title: Security Policy
description: Security principles used to design, operate, and maintain KiTech Software products and services.
version: 1.0.0
lastUpdated: 2026-08-07
effectiveDate: 2026-08-07
draft: false
---

## 1. Purpose

KITECH SOFTWARE LTD designs and operates software with security as a core engineering and operational requirement.

This policy describes company-wide principles. Product-specific security documentation may define additional controls, deployment responsibilities, certifications, data-residency arrangements, and support commitments.

## 2. Security principles

Our security approach is based on:

- least privilege and explicit access control;
- secure defaults and defence in depth;
- separation of environments, tenants, and responsibilities where applicable;
- encryption in transit and appropriate protection at rest;
- auditable changes and accountable administration;
- prompt correction of material vulnerabilities;
- minimisation of collected and retained information;
- resilient backup and recovery appropriate to the service;
- proportionate monitoring, incident detection, and response; and
- continuous improvement based on risk, evidence, and operational experience.

## 3. Secure development

Depending on the product and risk, secure development practices may include:

- threat modelling and architecture review;
- peer review and automated validation;
- dependency and vulnerability management;
- secret-management controls;
- test, staging, and production separation;
- access review and change control;
- security testing before material releases; and
- documented incident and remediation processes.

No process can guarantee that software will be free from every vulnerability.

## 4. Access and personnel

Access to systems and information is restricted according to role and operational need. Administrative access should use strong authentication and be logged where appropriate.

People with access to confidential or personal information are expected to follow confidentiality, acceptable-use, privacy, and security requirements.

## 5. Infrastructure and providers

We assess infrastructure and service providers proportionate to the sensitivity and purpose of the service. Relevant providers are identified in the [Subprocessors and Service Providers](/legal/subprocessors/) page or product-specific documentation.

Customer-managed and self-hosted operators remain responsible for their own infrastructure, configuration, identity systems, backups, network controls, monitoring, and timely application of security updates unless a written agreement states otherwise.

## 6. Vulnerability management

Reported or detected vulnerabilities are assessed according to factors such as exploitability, exposure, affected information, user impact, available mitigations, and service criticality.

Remediation may include configuration changes, patches, feature restrictions, credential rotation, user guidance, provider coordination, or other proportionate controls.

Security researchers should follow the [Responsible Disclosure Policy](/legal/responsible-disclosure/).

## 7. Security incidents

When a suspected incident is identified, we aim to:

- contain and investigate the issue;
- preserve relevant evidence;
- reduce ongoing risk;
- restore affected services safely;
- notify affected parties and authorities where required; and
- review causes and improve controls.

Incident communications may be limited while investigation, containment, law enforcement, or legal obligations require confidentiality.

## 8. User responsibilities

Users and organisations should:

- protect credentials and recovery methods;
- use supported software and apply security updates;
- configure access and sharing controls appropriately;
- report suspected compromise promptly;
- maintain secure devices and networks; and
- follow product documentation and organisational policy.

## 9. Contact

Security questions and reports may be sent to [hello@kitechsoftware.com](mailto:hello@kitechsoftware.com).

For vulnerability reports, use the subject **Security vulnerability report** and follow the Responsible Disclosure Policy.
