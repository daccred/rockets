# Rockets NestJS Exception

Provide exception handling/normalization and error code mapping.

For more details on the exception filters pattern, please refer to the official
NestJS [Exception Filters](https://docs.nestjs.com/exception-filters) documentation.

## Installation

`yarn add @concepta/nestjs-exception`

## Binding The Filer

You can bind the filter to classes, methods and globally.

### Class Decorator

```ts
// ...
import { ExceptionsFilter } from '@concepta/nestjs-exception';

@UseFilters(new ExceptionsFilter())
export class PhotoController {
  // ...
}
```

### Method Decorator

```ts
// ...
import { ExceptionsFilter } from '@concepta/nestjs-exception';

@Post()
@UseFilters(new ExceptionsFilter())
async create(@Body() createPhotoDto: CreatePhotoDto) {
  throw new ForbiddenException();
}
```

### Global Filter

```ts
// ...
import { ExceptionsFilter } from '@concepta/nestjs-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
```

## TODO

*   Define interface for exception filter response payload.