import { fakeAsync, flush, tick } from "@angular/core/testing";

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
})