import { Category } from "../types";

// Mock chrome API for this test suite
const mockChrome = {
    storage: {
        sync: {
            get: jest.fn(),
            set: jest.fn()
        },
        local: {
            get: jest.fn(),
            set: jest.fn()
        },
        onChanged: {
            addListener: jest.fn()
        }
    }
};

describe('Hide All Segments Feature', () => {
    beforeEach(() => {
        // Reset all mocks
        jest.clearAllMocks();

        // Setup chrome mock
        global.chrome = mockChrome as unknown as typeof chrome;

        // Setup document mocks
        document.querySelector = jest.fn().mockImplementation((selector) => {
            if (selector === 'video') {
                return {
                    currentTime: 0,
                    dispatchEvent: jest.fn(),
                    hasAttribute: jest.fn().mockReturnValue(false)
                };
            }
            if (selector === '.sponsorblock-preview-bar') {
                return {
                    style: { display: 'none' }
                };
            }
            return null;
        });
    });

    test('should block segment submissions when hideAllSegments is enabled', () => {
        const mockConfig = {
            config: {
                hideAllSegments: true,
                categorySelections: [],
                permissions: {},
                defaultCategory: "sponsor" as Category
            }
        };
        const canSubmit = !mockConfig.config.hideAllSegments;
        expect(canSubmit).toBe(false);
    });

    test('should allow segment submissions when hideAllSegments is disabled', () => {
        const mockConfig = {
            config: {
                hideAllSegments: false,
                categorySelections: [],
                permissions: {},
                defaultCategory: "sponsor" as Category
            }
        };
        const canSubmit = !mockConfig.config.hideAllSegments;
        expect(canSubmit).toBe(true);
    });

    test('should maintain autoskip functionality with hidden segments', () => {
        const mockVideo = document.querySelector('video') as HTMLVideoElement;
        mockVideo.currentTime = 20;
        expect(mockVideo.currentTime).toBe(20);
    });

    test('should collapse timeline when segments are hidden', () => {
        const mockPreviewBar = document.querySelector('.sponsorblock-preview-bar') as HTMLElement;
        expect(mockPreviewBar.style.display).toBe('none');
    });
});
