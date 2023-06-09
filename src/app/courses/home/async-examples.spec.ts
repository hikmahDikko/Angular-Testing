import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

describe("Async Testing Examples", () => {
    it("Asychronous test example with jasmine done()", (done : DoneFn) => {
        let test = false;

        setTimeout(() => {
            test = true;

            expect(test).toBeTruthy()

            done();
        }, 1000)
    });

    it("Asychronous test with setTimeout(", fakeAsync(() => {
        let test = false;

        setTimeout(() => {})
        setTimeout(() => {
            test = true;

        }, 1000)
        
        //tick(1000);
        flush();
        expect(test).toBeTruthy()
    }));

    it("Asynchronous test example - plain Promise", fakeAsync(() => {
        let test = false;
        Promise.resolve().then(() => {
            return Promise.resolve()
        }).then(() => {
            test = true;
        })

        flushMicrotasks();
        expect(test).toBeTruthy();
    }));

    it("Asychronous test example - Promises + setTimeout()", fakeAsync(() => {
        let counter = 0;
        Promise.resolve().then(() => {
            counter += 10

            setTimeout(() => {
                counter++;
            }, 1000)
        });

        expect(counter).toBe(0);

        flushMicrotasks();

        expect(counter).toBe(10)

        flush();

        expect(counter).toBe(11);

    }));
})