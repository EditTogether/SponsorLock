import Config from "../config";

export function updateAll(): void {
    // Update all player elements
    const event = new CustomEvent('sponsorblock-player-update');
    window.dispatchEvent(event);
}

export function hideDeArrowPromotion(): void {
    const promoElement = document.querySelector('.dearrow-promotion');
    if (promoElement) {
        promoElement.remove();
    }
}

export function tryShowingDeArrowPromotion(): void {
    if (!Config.config.hideAllSegments) {
        const promoElement = document.createElement('div');
        promoElement.className = 'dearrow-promotion';
        document.body.appendChild(promoElement);
    }
}

export function getIsInline(): boolean {
    const video = document.querySelector('video');
    return video ? video.hasAttribute('inline') : false;
}

export function isMobileControlsOpen(): boolean {
    const mobileControls = document.querySelector('.ytp-mobile-controls');
    return mobileControls ? window.getComputedStyle(mobileControls).display !== 'none' : false;
}

export function findValidElement(selector: string): HTMLElement | null {
    const element = document.querySelector(selector);
    return element instanceof HTMLElement ? element : null;
}
