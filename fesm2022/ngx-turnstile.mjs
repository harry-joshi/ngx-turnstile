import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, NgModule, forwardRef, Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

class NgxTurnstileService {
    constructor() { }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [] });

const CALLBACK_NAME = 'onloadTurnstileCallback';
class NgxTurnstileComponent {
    elementRef;
    zone;
    siteKey;
    action;
    cData;
    theme = 'auto';
    version = '0';
    tabIndex;
    appearance = 'always';
    resolved = new EventEmitter();
    errored = new EventEmitter();
    widgetId;
    constructor(elementRef, zone) {
        this.elementRef = elementRef;
        this.zone = zone;
    }
    _getCloudflareTurnstileUrl() {
        if (this.version === '0') {
            return 'https://challenges.cloudflare.com/turnstile/v0/api.js';
        }
        throw 'Version not defined in ngx-turnstile component.';
    }
    ngAfterViewInit() {
        let turnstileOptions = {
            sitekey: this.siteKey,
            theme: this.theme,
            tabindex: this.tabIndex,
            action: this.action,
            cData: this.cData,
            appearance: this.appearance,
            callback: (token) => {
                this.zone.run(() => this.resolved.emit(token));
            },
            'error-callback': (errorCode) => {
                this.zone.run(() => this.errored.emit(errorCode));
                // Returning false causes Turnstile to log error code as a console warning.
                return false;
            },
            'expired-callback': () => {
                this.zone.run(() => this.reset());
            },
        };
        const script = document.createElement('script');
        window[CALLBACK_NAME] = () => {
            if (!this.elementRef?.nativeElement) {
                return;
            }
            this.widgetId = window.turnstile.render(this.elementRef.nativeElement, turnstileOptions);
        };
        script.src = `${this._getCloudflareTurnstileUrl()}?render=explicit&onload=${CALLBACK_NAME}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }
    reset() {
        if (this.widgetId) {
            this.resolved.emit(null);
            window.turnstile.reset(this.widgetId);
        }
    }
    ngOnDestroy() {
        if (this.widgetId) {
            window.turnstile.remove(this.widgetId);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileComponent, deps: [{ token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.0.8", type: NgxTurnstileComponent, selector: "ngx-turnstile", inputs: { siteKey: "siteKey", action: "action", cData: "cData", theme: "theme", version: "version", tabIndex: "tabIndex", appearance: "appearance" }, outputs: { resolved: "resolved", errored: "errored" }, exportAs: ["ngx-turnstile"], ngImport: i0, template: ``, isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ngx-turnstile',
                    template: ``,
                    exportAs: 'ngx-turnstile',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { siteKey: [{
                type: Input
            }], action: [{
                type: Input
            }], cData: [{
                type: Input
            }], theme: [{
                type: Input
            }], version: [{
                type: Input
            }], tabIndex: [{
                type: Input
            }], appearance: [{
                type: Input
            }], resolved: [{
                type: Output
            }], errored: [{
                type: Output
            }] } });

class NgxTurnstileModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileModule, declarations: [NgxTurnstileComponent], exports: [NgxTurnstileComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxTurnstileComponent],
                    imports: [],
                    exports: [NgxTurnstileComponent],
                }]
        }] });

class NgxTurnstileValueAccessorDirective {
    turnstileComp;
    onChange;
    onTouched;
    resolved = false;
    constructor(turnstileComp) {
        this.turnstileComp = turnstileComp;
    }
    ngOnInit() {
        this.turnstileComp.resolved.subscribe((token) => {
            this.resolved = !!token;
            if (this.onChange) {
                this.onChange(token);
            }
            if (this.onTouched) {
                this.onTouched();
            }
        });
    }
    // Prevent form control from setting token value
    writeValue(value) {
        // reset turnstile component if form control sets the value after already receiving a valid token
        if (this.resolved) {
            this.resolved = false;
            this.turnstileComp.reset();
        }
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileValueAccessorDirective, deps: [{ token: NgxTurnstileComponent }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.8", type: NgxTurnstileValueAccessorDirective, selector: "ngx-turnstile[formControl], ngx-turnstile[formControlName], ngx-turnstile[ngModel]", providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => NgxTurnstileValueAccessorDirective),
                multi: true,
            },
        ], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileValueAccessorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: 'ngx-turnstile[formControl], ngx-turnstile[formControlName], ngx-turnstile[ngModel]',
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => NgxTurnstileValueAccessorDirective),
                            multi: true,
                        },
                    ],
                }]
        }], ctorParameters: () => [{ type: NgxTurnstileComponent }] });

class NgxTurnstileFormsModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileFormsModule, declarations: [NgxTurnstileValueAccessorDirective], imports: [NgxTurnstileModule], exports: [NgxTurnstileValueAccessorDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileFormsModule, imports: [NgxTurnstileModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: NgxTurnstileFormsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [NgxTurnstileValueAccessorDirective],
                    imports: [NgxTurnstileModule],
                    exports: [NgxTurnstileValueAccessorDirective],
                }]
        }] });

/*
 * Public API Surface of ngx-turnstile
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxTurnstileComponent, NgxTurnstileFormsModule, NgxTurnstileModule, NgxTurnstileService, NgxTurnstileValueAccessorDirective };
//# sourceMappingURL=ngx-turnstile.mjs.map
