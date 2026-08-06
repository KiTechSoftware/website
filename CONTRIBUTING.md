# Contributing to the KiTech Software Website

Thank you for contributing to the KiTech Software website. This guide covers local development, content changes, validation, and review expectations.

## Prerequisites

Use the versions supported by the repository automation:

- Node.js 22 or newer;
- npm 11 or newer; and
- Git.

## Local development

Clone the repository and install dependencies:

```sh
git clone https://github.com/KiTechSoftware/website.git
cd website
npm install
```

Start the Astro development server:

```sh
npm run dev
```

Astro serves the site locally at `http://localhost:4321` by default.

## Validation

Before submitting a change, run:

```sh
npm run build
```

For a local production preview, run:

```sh
npm run preview
```

A contribution should not introduce build warnings, broken internal links, inaccessible controls, or regressions in responsive and dark-mode behaviour.

## Branches and pull requests

- Create a focused branch for each change.
- Keep commits small and use descriptive commit messages.
- Do not commit generated `dist/` output or dependency directories.
- Explain the purpose, implementation, and validation performed in the pull request.
- Include screenshots for visible interface changes when useful.
- Do not combine unrelated legal, content, design, and infrastructure changes without a clear reason.

The repository CODEOWNERS determine the required reviewers. Approval is not automatic, and maintainers may request changes to protect accessibility, legal accuracy, security, brand consistency, or long-term maintainability.

## Project structure

- `src/pages/` contains Astro routes.
- `src/layouts/` contains shared layouts.
- `src/styles/` contains global styles.
- `src/content/legal/` contains company-wide policies.
- `public/` contains files published without transformation.
- `.github/workflows/` contains validation and deployment workflows.

## Content standards

Use British English unless a quoted name, external specification, or product requirement uses another form.

Company claims, registration details, contact details, policy dates, and legal statements must be verified before being changed. Do not invent or infer legal facts. The authoritative public company record is:

<https://find-and-update.company-information.service.gov.uk/company/10528257>

Legal documents must:

- preserve their frontmatter schema;
- use an explicit version, effective date, and last-updated date;
- remain consistent with actual product and website behaviour;
- distinguish company-wide terms from product-specific terms; and
- avoid weakening mandatory consumer, privacy, or statutory rights.

Product-specific policies should supplement company-wide policies rather than silently replace them.

## Accessibility and design

Changes must preserve or improve:

- semantic document structure;
- keyboard navigation and visible focus states;
- readable colour contrast;
- responsive layouts;
- reduced-motion preferences where animation is used;
- meaningful labels for controls and links; and
- light and dark themes.

Do not remove accessibility behaviour merely to simplify styling or implementation.

## Security reports

Do not disclose suspected vulnerabilities in a public issue. Follow the instructions published in `public/.well-known/security.txt`.

## Licensing contributions

By submitting source code, you confirm that you have the right to contribute it and agree that it may be distributed under the Apache License 2.0.

Do not contribute third-party code, images, fonts, copy, logos, or other material unless its licence permits inclusion and the required attribution is supplied.

The Apache License does not grant rights to KiTech Software trademarks or brand assets. See `LICENSE-SCOPE.md` and `TRADEMARKS.md`.
