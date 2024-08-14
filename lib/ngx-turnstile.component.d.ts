import { AfterViewInit, ElementRef, NgZone, EventEmitter, OnDestroy } from '@angular/core';
import { TurnstileOptions } from './interfaces/turnstile-options';
import * as i0 from "@angular/core";
declare global {
    interface Window {
        onloadTurnstileCallback: () => void;
        turnstile: {
            render: (idOrContainer: string | HTMLElement, options: TurnstileOptions) => string;
            reset: (widgetIdOrContainer: string | HTMLElement) => void;
            getResponse: (widgetIdOrContainer: string | HTMLElement) => string | undefined;
            remove: (widgetIdOrContainer: string | HTMLElement) => void;
        };
    }
}
type SupportedVersion = '0';
export declare class NgxTurnstileComponent implements AfterViewInit, OnDestroy {
    private elementRef;
    private zone;
    siteKey: string;
    action?: string;
    cData?: string;
    theme?: 'light' | 'dark' | 'auto';
    version: SupportedVersion;
    tabIndex?: number;
    appearance?: 'always' | 'execute' | 'interaction-only';
    resolved: EventEmitter<string | null>;
    private widgetId;
    constructor(elementRef: ElementRef<HTMLElement>, zone: NgZone);
    private _getCloudflareTurnstileUrl;
    ngAfterViewInit(): void;
    reset(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxTurnstileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxTurnstileComponent, "ngx-turnstile", ["ngx-turnstile"], { "siteKey": ""; "action": ""; "cData": ""; "theme": ""; "version": ""; "tabIndex": ""; "appearance": ""; }, { "resolved": "resolved"; }, never, never, false, never>;
}
export {};
