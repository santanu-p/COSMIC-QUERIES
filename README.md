# Tutorial: COSMIC-QUERIES

`COSMIC-QUERIES` is an application designed to provide users with *surprising and mind-blowing physics facts*. It uses an **AI model** (Google Gemini) to generate these facts dynamically. The application features an *intuitive user interface* where you can easily request new facts, and it manages various states like loading and errors to ensure a smooth experience.


## Visual Overview

```mermaid
flowchart TD
    A0["User Interface (UI)
"]
    A1["AI Fact Generation Service
"]
    A2["Application State Management
"]
    A3["Reusable UI Components
"]
    A4["Build and Environment Configuration
"]
    A0 -- "Requests facts from" --> A1
    A0 -- "Updates & reads state" --> A2
    A2 -- "Informs display of" --> A0
    A0 -- "Composed of" --> A3
    A1 -- "Uses API key from" --> A4
    A4 -- "Builds & serves" --> A0
```

## Chapters

1. [User Interface (UI)
](01_user_interface__ui__.md)
2. [Application State Management
](02_application_state_management_.md)
3. [AI Fact Generation Service
](03_ai_fact_generation_service_.md)
4. [Reusable UI Components
](04_reusable_ui_components_.md)
5. [Build and Environment Configuration
](05_build_and_environment_configuration_.md)

---
