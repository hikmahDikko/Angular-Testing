import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
    let calculator : CalculatorService;
    let loggerSpy;
    beforeEach(() => {
        loggerSpy = jasmine.createSpyObj('LoggerService', ["log"]);
    
        TestBed.configureTestingModule({
            providers: [
                CalculatorService,
                {
                    provide : LoggerService, 
                    useValue : loggerSpy
                }
            ]
        })
        calculator = TestBed.get(CalculatorService);
    })
    it('should add two numbers', () => {

        const result = calculator.add(1,3);
        
        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
        expect(result).toBe(4);
    });

    it('should subtract two numbers', () => {

        const result = calculator.subtract(3,1);

        expect(loggerSpy.log).toHaveBeenCalledTimes(1);
        expect(result).toBe(2, "unexpected result");
    });
})