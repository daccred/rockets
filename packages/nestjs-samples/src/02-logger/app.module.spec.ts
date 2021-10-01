import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { LoggerSentryTransport, LoggerService } from '../../../nestjs-logger/dist';
import { OrderService } from './order/order.service';

describe('AppModule', () => {
  
  let ordersService: OrderService;
  let logService: jest.SpyInstance;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[AppModule]
    }).compile();

    
    ordersService = app.get<OrderService>(OrderService);
    
    const loggerSentryTransport = app.get(LoggerSentryTransport);
    
    // Get reference of LoggerService From LoggerModule
    const customLoggerService = app.get(LoggerService);
    
    // Inform that sentry transport will also be used
    customLoggerService.addTransport(loggerSentryTransport);
    
    // This is to inform that this logger will new used internally
    // or it will be used once yuo do a new Logger()
    app.useLogger(customLoggerService);
    
    logService = jest.spyOn(customLoggerService, 'log')
      .mockImplementation(() => null);

  });

  describe('Order Controller', () => {
    it('Create order log', () => {
     
      ordersService.create({
        description: 'Description to log',
        name:'Order 1'
      });
      expect(logService).toBeCalledTimes(1);
    });
  });
});
