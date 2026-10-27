import { createValidId, clickAwayListener } from './utils';

describe('createValidId', () => {
  it('should convert strings to lowercase and replace spaces with hyphens', () => {
    expect(createValidId('Hello World')).toBe('hello-world');
    expect(createValidId('CBP Listbox Item 1')).toBe('cbp-listbox-item-1');
  });

  it('should normalize accented characters and remove diacritical marks', () => {
    expect(createValidId('café')).toBe('cafe');
    expect(createValidId('Rôle & Résumé')).toBe('role-resume');
    expect(createValidId('Crème brûlée')).toBe('creme-brulee');
    expect(createValidId('Niño Señor')).toBe('nino-senor');
  });

  it('should remove special non-alphanumeric characters except spaces and hyphens', () => {
    expect(createValidId('Hello, World!')).toBe('hello-world');
    expect(createValidId('item_1 (subitem) @#$')).toBe('item1-subitem');
  });

  it('should collapse multiple spaces and hyphens into a single hyphen', () => {
    expect(createValidId('multiple   spaces   here')).toBe('multiple-spaces-here');
    expect(createValidId('too---many---hyphens')).toBe('too-many-hyphens');
    expect(createValidId('mixed ---  spaces  -- and -- hyphens')).toBe('mixed-spaces-and-hyphens');
  });

  it('should trim leading and trailing spaces and hyphens', () => {
    expect(createValidId('  --leading and trailing--  ')).toBe('leading-and-trailing');
    expect(createValidId('-start-end-')).toBe('start-end');
  });

  it('should return an empty string for empty input or input with only special characters', () => {
    expect(createValidId('')).toBe('');
    expect(createValidId('   ')).toBe('');
    expect(createValidId('!@#$%')).toBe('');
    expect(createValidId('---')).toBe('');
  });

  it('should correctly handle alphanumeric mixed strings with numbers', () => {
    expect(createValidId('Item 123 - Test 456')).toBe('item-123-test-456');
  });
});

describe('clickAwayListener', () => {
  let host: HTMLElement;
  let insideBtn: HTMLElement;
  let outsideEl: HTMLElement;

  beforeEach(() => {
    host = document.createElement('div');
    host.id = 'host-component';

    insideBtn = document.createElement('button');
    insideBtn.id = 'inside-btn';
    host.appendChild(insideBtn);

    outsideEl = document.createElement('button');
    outsideEl.id = 'outside-btn';

    document.body.appendChild(host);
    document.body.appendChild(outsideEl);
  });

  afterEach(() => {
    clickAwayListener(host, null);
    if (host.parentNode) host.parentNode.removeChild(host);
    if (outsideEl.parentNode) outsideEl.parentNode.removeChild(outsideEl);
  });

  it('should call callback and remove listeners when clicking outside host', () => {
    let callCount = 0;
    clickAwayListener(host, () => {
      callCount++;
    });

    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(1);

    // Second click outside should NOT call callback because the listener was already removed
    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(1);
  });

  it('should not trigger callback when clicking inside host', () => {
    let callCount = 0;
    clickAwayListener(host, () => {
      callCount++;
    });

    insideBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(0);

    host.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(0);
  });

  it('should properly remove listeners when called with null callback', () => {
    let callCount = 0;
    clickAwayListener(host, () => {
      callCount++;
    });

    // Remove listener using null callback
    clickAwayListener(host, null);

    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(0);
  });

  it('should properly remove listeners when the returned cleanup function is invoked', () => {
    let callCount = 0;
    const cleanup = clickAwayListener(host, () => {
      callCount++;
    });

    cleanup();

    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(0);
  });

  it('should replace previous listener without stacking when called multiple times on the same host', () => {
    let firstCallCount = 0;
    let secondCallCount = 0;

    clickAwayListener(host, () => {
      firstCallCount++;
    });

    // Re-register listener on the same host without explicit prior teardown
    clickAwayListener(host, () => {
      secondCallCount++;
    });

    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(firstCallCount).toBe(0);
    expect(secondCallCount).toBe(1);
  });

  it('should trigger on touchend outside host', () => {
    let callCount = 0;
    clickAwayListener(host, () => {
      callCount++;
    });

    outsideEl.dispatchEvent(new CustomEvent('touchend', { bubbles: true }));
    expect(callCount).toBe(1);
  });

  it('should clean up when host is disconnected from DOM', () => {
    let callCount = 0;
    clickAwayListener(host, () => {
      callCount++;
    });

    host.remove();

    outsideEl.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(callCount).toBe(0);
  });

  it('should safely handle null or undefined host', () => {
    let callCount = 0;
    const cleanup = clickAwayListener(null as any, () => {
      callCount++;
    });

    expect(typeof cleanup).toBe('function');
    cleanup();
    expect(callCount).toBe(0);
  });
});

