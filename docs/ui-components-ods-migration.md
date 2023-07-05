# Migrating from ui-components to ODS

## Components

### Tag

- The `label` prop has been replaced with `children` to make the component more flexible.  
  From:
  ```test
  <Tag label="my-label" />
  ```
  To:
  ```
  <Tag>my-label</Tag>
  ```
