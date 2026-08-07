---
title: Responsible Disclosure Policy
description: How to report suspected security vulnerabilities to KiTech Software safely and responsibly.
version: 1.0.0
lastUpdated: 2026-08-07
effectiveDate: 2026-08-07
draft: false
---

# Responsible Disclosure Policy

## 1. Scope

This policy applies to suspected security vulnerabilities in KiTech-operated websites, services, applications, APIs, and public repositories where KiTech is responsible for remediation.

It does not authorise testing of customer-managed, partner-operated, or self-hosted systems without the operator's explicit permission.

## 2. Reporting a vulnerability

Email [hello@kitechsoftware.com](mailto:hello@kitechsoftware.com) with the subject **Security vulnerability report**.

Include, where available:

- the affected product, service, URL, repository, version, or component;
- a clear description of the issue and its potential impact;
- reproducible steps or a minimal proof of concept;
- relevant request, response, log, screenshot, or environment information;
- whether personal information, credentials, or production systems may be affected; and
- a safe way to contact you for follow-up.

Do not include unnecessary personal information, active credentials, private keys, illegal content, or data belonging to other users.

## 3. Research expectations

When investigating a suspected vulnerability:

- act in good faith and avoid harm;
- use the minimum access and data necessary to demonstrate the issue;
- stop testing if you encounter personal, confidential, financial, health, authentication, or other sensitive information;
- do not alter, delete, download, retain, or disclose data that is not yours;
- do not disrupt service availability or degrade performance;
- do not use social engineering, phishing, physical intrusion, credential stuffing, or denial-of-service techniques;
- do not test third-party systems or customer deployments without separate authorisation; and
- give KiTech reasonable time to investigate and remediate before public disclosure.

## 4. Out-of-scope activity

The following are not authorised under this policy:

- denial-of-service or resource-exhaustion testing;
- automated scanning that creates material load or excessive alerts;
- physical attacks or social engineering;
- access to another person's account without explicit permission;
- exploitation beyond what is necessary to confirm the vulnerability;
- modification, deletion, extraction, or publication of user data;
- testing systems not operated by KiTech; and
- threats, extortion, or demands for payment as a condition of nondisclosure.

## 5. Our response

We aim to acknowledge a credible report, assess its severity, maintain reasonable communication, and coordinate remediation and disclosure where appropriate.

Response and remediation time depend on complexity, severity, affected products, dependencies, available mitigations, and operational risk. We do not guarantee a bounty or payment.

## 6. Good-faith research

Where research is conducted in good faith, remains within this policy, and is reported promptly, KiTech will not initiate legal action solely because of that compliant research.

This statement does not bind third parties, excuse unlawful conduct, authorise access to systems outside scope, or prevent action required to protect users, systems, or legal rights.

## 7. Disclosure

Do not publicly disclose a vulnerability before KiTech has had a reasonable opportunity to investigate and remediate it.

We may agree a coordinated disclosure date and may credit the reporter where requested and appropriate.

## 8. Security contact file

Machine-readable contact information is published at `https://kitechsoftware.com/.well-known/security.txt`.
