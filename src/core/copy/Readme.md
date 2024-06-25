# Problem

Some applications support multiple languages but face challenges when using the ODS library, which only provides text in
English. Since the ODS library does not allow text customization, these applications end up with inconsistent
interfaces. Most of the user interface displays in the user's preferred language, while the ODS components display text
exclusively in English, leading to a disjointed user experience.

# Solution #1: Provide a copy

ODS will enable users of the library to customize the text by providing copy as a prop to the top-level ODS provider.
This allows developers to supply localized text for the ODS components, ensuring that the entire application interface
can be displayed in the user's preferred language.

### Copy

We will implement an interface for the copy object required by the ODS provider. Most fields will be simple strings, but
for texts with parameters (such as numbers or union types), we will use functions to generate the text appropriately for
the user's preferred language. This approach ensures that all text, including dynamic content, is properly localized and
consistent throughout the application.

### Languages

ODS will maintain an English implementation of the copy interface, and it can also provide implementations in other
popular languages. This will simplify the user experience by reducing the number of texts developers need to translate,
making it easier to integrate and localize the library within their applications.

### Selected language

ODS does not need to be aware of the application's language, so there's no need to add a locale or language prop. To
simplify the process for developers using the library, we can provide a record or function to access our default copies
based on a language code. This approach allows developers to easily supply the appropriate localized text without the
ODS library needing to handle language specifics directly.

### 🚨Maintaining translations

Since we store copy as a TypeScript object, code generation will be necessary. We need to implement a system to generate
copies in other languages by translating the English copy. A challenge arises with text generator functions, which would
require the use of large language models (LLMs). This approach can be more error-prone compared to using established
translation services like Google Translate. Additionally, our system should support manual adjustments to translations
to ensure accuracy and customization.

# Solution #2: i18next

ODS will allow users of the library to customize text by either providing a language code (for supported languages) or
supplying translations in the i18next format. This approach leverages i18next, a widely-used framework for representing
translations, ensuring flexibility and ease of use for developers.

### Maintaining translations

We will use a translation service for new texts, which can be either fully automated or include human refinement. Texts
will be in the i18next-supported format, eliminating the need for code generation or conversions.
