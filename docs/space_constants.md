# Space Constants

Space constants are predefined space values used in the Agiliate Engine. They are documented in the [space_constant.ts](../src/calculations/interfaces/space_constant.ts) file

The `customSpaceConstants` object can be used to override the default constants for specific spaces.

For example, if you wish to overwrite the `minimumSquareMeters` for the auditorium space, you can do so by setting the `auditorium` property in the `customSpaceConstants` object.

```json
{
  "customSpaceConstants": {
    "auditorium": {
      "minimumSquareMeters": 100
    }
  }
}
```
