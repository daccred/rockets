import { Test } from '@nestjs/testing';
import { CrudRequest } from '@nestjsx/crud';
import { CrudQueryService } from './crud-query.service';
import { mock } from 'jest-mock-extended';
import { CrudQueryOptionsInterface } from '../interfaces/crud-query-options.interface';
import { SCondition } from '@nestjsx/crud-request';

describe('TypeOrmService', () => {
  let crudQueryService: CrudQueryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CrudQueryService],
    }).compile();

    crudQueryService = moduleRef.get<CrudQueryService>(CrudQueryService);
  });

  describe('IsDefined', () => {
    it('was CrudQueryService defined', async () => {
      expect(crudQueryService).toBeDefined();
    });
  });

  describe('modifyRequest', () => {
    describe('when adding search', () => {
      it('should add search', async () => {
        // the fake request
        const req: CrudRequest = mock<CrudRequest>();

        // mock some filters on the request
        req.parsed.search = {
          name: 'apple',
        };

        const options: CrudQueryOptionsInterface = {
          search: {
            name: 'pear',
          },
        };

        crudQueryService.modifyRequest(req, options);

        expect(req.parsed.search).toEqual<SCondition>({
          $and: [
            {
              name: 'apple',
            },
            {
              name: 'pear',
            },
          ],
        });
      });
    });
  });
});
