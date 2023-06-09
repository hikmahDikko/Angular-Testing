import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { HomeComponent } from "./home.component"
import { DebugElement } from "@angular/core";
import { CoursesModule } from "../courses.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { CoursesService } from "../services/courses.service";
import { setupCourses } from "../common/setup-test-data";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { click } from "../common/test-utils";

describe("HomeComponent", () => {
    let component: HomeComponent;
    let fixture : ComponentFixture<HomeComponent>;
    let el : DebugElement;
    let coursesService : any;

    const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER')
    const advancedCourses = setupCourses().filter((course) => course.category === 'ADVANCED')

    beforeEach(async(() => {
        const coursesServiceSpy = jasmine.createSpyObj('coursesService', ['findAllCourses']);
        TestBed.configureTestingModule({
            imports : [
                CoursesModule,
                NoopAnimationsModule
            ],
            providers : [
                {
                    provide : CoursesService,
                    useValue : coursesServiceSpy
                }
            ]
        })
        .compileComponents()
        .then(() => {
            fixture = TestBed.createComponent(HomeComponent);
            component = fixture.componentInstance;
            el = fixture.debugElement;
            coursesService = TestBed.get(CoursesService);
        });
    }));
    it("should create a component", () => {
        expect(component).toBeTruthy();
    });
    it("should display only beginners courses", () => {
        coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mdc-tab'));

        expect(tabs.length).toBe(1, "Unexpected number of tabs found");

    });
    it("should display only advance courses", () => {
        coursesService.findAllCourses.and.returnValue(of(advancedCourses));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mdc-tab'));

        expect(tabs.length).toBe(1, "Unexpected tab number");
    });
    it('should display both tabs', () => {
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mdc-tab'));

        expect(tabs.length).toBe(2, "Unexpected tab number");
    });
    xit('should display advanced courses when tab is clicked', (done : DoneFn) => {
        coursesService.findAllCourses.and.returnValue(of(setupCourses()));

        fixture.detectChanges();

        const tabs = el.queryAll(By.css('.mdc-tab'));

        click(tabs[0]);

        fixture.detectChanges();

        setTimeout(() => {
            const cartTitles = el.queryAll(By.css('.mat-mdc-card-title'));

            expect(cartTitles.length).toBeGreaterThan(0, "Could not find card titles");
            expect(cartTitles[0].nativeElement.textContent).toContain("Angular Security Course");

            done();
            
        }, 500);

    });
});