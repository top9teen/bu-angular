import { FormElderlyModule } from './form-elderly.module';

describe('FormElderlyModule', () => {
    let formElderlyModule: FormElderlyModule;

    beforeEach(() => {
        formElderlyModule = new FormElderlyModule();
    });

    it('should create an instance', () => {
        expect(formElderlyModule).toBeTruthy();
    });
});
