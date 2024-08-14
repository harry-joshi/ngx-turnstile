import { Component, Input, Output, EventEmitter, } from '@angular/core';
import * as i0 from "@angular/core";
const CALLBACK_NAME = 'onloadTurnstileCallback';
export class NgxTurnstileComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXR1cm5zdGlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtdHVybnN0aWxlL3NyYy9saWIvbmd4LXR1cm5zdGlsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFHVCxLQUFLLEVBRUwsTUFBTSxFQUNOLFlBQVksR0FFYixNQUFNLGVBQWUsQ0FBQzs7QUFvQnZCLE1BQU0sYUFBYSxHQUFHLHlCQUF5QixDQUFDO0FBUWhELE1BQU0sT0FBTyxxQkFBcUI7SUFldEI7SUFDQTtJQWZELE9BQU8sQ0FBVTtJQUNqQixNQUFNLENBQVU7SUFDaEIsS0FBSyxDQUFVO0lBQ2YsS0FBSyxHQUErQixNQUFNLENBQUM7SUFDM0MsT0FBTyxHQUFxQixHQUFHLENBQUM7SUFDaEMsUUFBUSxDQUFVO0lBQ2xCLFVBQVUsR0FBK0MsUUFBUSxDQUFDO0lBRWpFLFFBQVEsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztJQUM3QyxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWlCLENBQUM7SUFFOUMsUUFBUSxDQUFVO0lBRTFCLFlBQ1UsVUFBbUMsRUFDbkMsSUFBWTtRQURaLGVBQVUsR0FBVixVQUFVLENBQXlCO1FBQ25DLFNBQUksR0FBSixJQUFJLENBQVE7SUFDbkIsQ0FBQztJQUVJLDBCQUEwQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO1lBQ3hCLE9BQU8sdURBQXVELENBQUM7U0FDaEU7UUFFRCxNQUFNLGlEQUFpRCxDQUFDO0lBQzFELENBQUM7SUFFTSxlQUFlO1FBQ3BCLElBQUksZ0JBQWdCLEdBQXFCO1lBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLFFBQVEsRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO2dCQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2pELENBQUM7WUFDRCxnQkFBZ0IsRUFBRSxDQUFDLFNBQWlCLEVBQVcsRUFBRTtnQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsMkVBQTJFO2dCQUMzRSxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7WUFDRCxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7U0FDRixDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVoRCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsR0FBRyxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRTtnQkFDbkMsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQzdCLGdCQUFnQixDQUNqQixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsTUFBTSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRSwyQkFBMkIsYUFBYSxFQUFFLENBQUM7UUFDNUYsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsTUFBTSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN4QztJQUNILENBQUM7dUdBOUVVLHFCQUFxQjsyRkFBckIscUJBQXFCLCtSQUh0QixFQUFFOzsyRkFHRCxxQkFBcUI7a0JBTGpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxFQUFFO29CQUNaLFFBQVEsRUFBRSxlQUFlO2lCQUMxQjtvR0FFVSxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEFmdGVyVmlld0luaXQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHVybnN0aWxlT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90dXJuc3RpbGUtb3B0aW9ucyc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgb25sb2FkVHVybnN0aWxlQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XG4gICAgdHVybnN0aWxlOiB7XG4gICAgICByZW5kZXI6IChcbiAgICAgICAgaWRPckNvbnRhaW5lcjogc3RyaW5nIHwgSFRNTEVsZW1lbnQsXG4gICAgICAgIG9wdGlvbnM6IFR1cm5zdGlsZU9wdGlvbnMsXG4gICAgICApID0+IHN0cmluZztcbiAgICAgIHJlc2V0OiAod2lkZ2V0SWRPckNvbnRhaW5lcjogc3RyaW5nIHwgSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gICAgICBnZXRSZXNwb25zZTogKFxuICAgICAgICB3aWRnZXRJZE9yQ29udGFpbmVyOiBzdHJpbmcgfCBIVE1MRWxlbWVudCxcbiAgICAgICkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgcmVtb3ZlOiAod2lkZ2V0SWRPckNvbnRhaW5lcjogc3RyaW5nIHwgSFRNTEVsZW1lbnQpID0+IHZvaWQ7XG4gICAgfTtcbiAgfVxufVxuXG5jb25zdCBDQUxMQkFDS19OQU1FID0gJ29ubG9hZFR1cm5zdGlsZUNhbGxiYWNrJztcbnR5cGUgU3VwcG9ydGVkVmVyc2lvbiA9ICcwJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LXR1cm5zdGlsZScsXG4gIHRlbXBsYXRlOiBgYCxcbiAgZXhwb3J0QXM6ICduZ3gtdHVybnN0aWxlJyxcbn0pXG5leHBvcnQgY2xhc3MgTmd4VHVybnN0aWxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgc2l0ZUtleSE6IHN0cmluZztcbiAgQElucHV0KCkgYWN0aW9uPzogc3RyaW5nO1xuICBASW5wdXQoKSBjRGF0YT86IHN0cmluZztcbiAgQElucHV0KCkgdGhlbWU/OiAnbGlnaHQnIHwgJ2RhcmsnIHwgJ2F1dG8nID0gJ2F1dG8nO1xuICBASW5wdXQoKSB2ZXJzaW9uOiBTdXBwb3J0ZWRWZXJzaW9uID0gJzAnO1xuICBASW5wdXQoKSB0YWJJbmRleD86IG51bWJlcjtcbiAgQElucHV0KCkgYXBwZWFyYW5jZT86ICdhbHdheXMnIHwgJ2V4ZWN1dGUnIHwgJ2ludGVyYWN0aW9uLW9ubHknID0gJ2Fsd2F5cyc7XG5cbiAgQE91dHB1dCgpIHJlc29sdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBudWxsPigpO1xuICBAT3V0cHV0KCkgZXJyb3JlZCA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nIHwgbnVsbD4oKTtcblxuICBwcml2YXRlIHdpZGdldElkITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSB6b25lOiBOZ1pvbmUsXG4gICkge31cblxuICBwcml2YXRlIF9nZXRDbG91ZGZsYXJlVHVybnN0aWxlVXJsKCk6IHN0cmluZyB7XG4gICAgaWYgKHRoaXMudmVyc2lvbiA9PT0gJzAnKSB7XG4gICAgICByZXR1cm4gJ2h0dHBzOi8vY2hhbGxlbmdlcy5jbG91ZGZsYXJlLmNvbS90dXJuc3RpbGUvdjAvYXBpLmpzJztcbiAgICB9XG5cbiAgICB0aHJvdyAnVmVyc2lvbiBub3QgZGVmaW5lZCBpbiBuZ3gtdHVybnN0aWxlIGNvbXBvbmVudC4nO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBsZXQgdHVybnN0aWxlT3B0aW9uczogVHVybnN0aWxlT3B0aW9ucyA9IHtcbiAgICAgIHNpdGVrZXk6IHRoaXMuc2l0ZUtleSxcbiAgICAgIHRoZW1lOiB0aGlzLnRoZW1lLFxuICAgICAgdGFiaW5kZXg6IHRoaXMudGFiSW5kZXgsXG4gICAgICBhY3Rpb246IHRoaXMuYWN0aW9uLFxuICAgICAgY0RhdGE6IHRoaXMuY0RhdGEsXG4gICAgICBhcHBlYXJhbmNlOiB0aGlzLmFwcGVhcmFuY2UsXG4gICAgICBjYWxsYmFjazogKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnJlc29sdmVkLmVtaXQodG9rZW4pKTtcbiAgICAgIH0sXG4gICAgICAnZXJyb3ItY2FsbGJhY2snOiAoZXJyb3JDb2RlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLmVycm9yZWQuZW1pdChlcnJvckNvZGUpKTtcbiAgICAgICAgLy8gUmV0dXJuaW5nIGZhbHNlIGNhdXNlcyBUdXJuc3RpbGUgdG8gbG9nIGVycm9yIGNvZGUgYXMgYSBjb25zb2xlIHdhcm5pbmcuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG4gICAgICAnZXhwaXJlZC1jYWxsYmFjayc6ICgpID0+IHtcbiAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB0aGlzLnJlc2V0KCkpO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICB3aW5kb3dbQ0FMTEJBQ0tfTkFNRV0gPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuZWxlbWVudFJlZj8ubmF0aXZlRWxlbWVudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2lkZ2V0SWQgPSB3aW5kb3cudHVybnN0aWxlLnJlbmRlcihcbiAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgIHR1cm5zdGlsZU9wdGlvbnMsXG4gICAgICApO1xuICAgIH07XG5cbiAgICBzY3JpcHQuc3JjID0gYCR7dGhpcy5fZ2V0Q2xvdWRmbGFyZVR1cm5zdGlsZVVybCgpfT9yZW5kZXI9ZXhwbGljaXQmb25sb2FkPSR7Q0FMTEJBQ0tfTkFNRX1gO1xuICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgc2NyaXB0LmRlZmVyID0gdHJ1ZTtcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMud2lkZ2V0SWQpIHtcbiAgICAgIHRoaXMucmVzb2x2ZWQuZW1pdChudWxsKTtcbiAgICAgIHdpbmRvdy50dXJuc3RpbGUucmVzZXQodGhpcy53aWRnZXRJZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLndpZGdldElkKSB7XG4gICAgICB3aW5kb3cudHVybnN0aWxlLnJlbW92ZSh0aGlzLndpZGdldElkKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==