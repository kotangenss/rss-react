import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import ResultSection from './index';
import { Item } from '../../interfaces/resultSection';

describe('ResultSection', () => {
  it('Renders without errors', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const items = [
      {
        id: 1,
        name: 'Item 1',
        thumbnail: {
          path: 'path/to/image1',
          extension: 'jpg',
        },
        description: 'Description of item 1',
        comics: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI1',
          items: [
            {
              resourceURI: 'resourceURI1',
              name: 'Comic 1',
            },
            {
              resourceURI: 'resourceURI2',
              name: 'Comic 2',
            },
          ],
        },
        series: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI3',
          items: [
            {
              resourceURI: 'resourceURI3',
              name: 'Series 1',
            },
            {
              resourceURI: 'resourceURI4',
              name: 'Series 2',
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Item 2',
        thumbnail: {
          path: 'path/to/image2',
          extension: 'png',
        },
        description: 'Description of item 2',
        comics: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI5',
          items: [
            {
              resourceURI: 'resourceURI5',
              name: 'Comic 3',
            },
            {
              resourceURI: 'resourceURI6',
              name: 'Comic 4',
            },
            {
              resourceURI: 'resourceURI7',
              name: 'Comic 5',
            },
          ],
        },
        series: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI8',
          items: [
            {
              resourceURI: 'resourceURI8',
              name: 'Series 3',
            },
            {
              resourceURI: 'resourceURI9',
              name: 'Series 4',
            },
            {
              resourceURI: 'resourceURI10',
              name: 'Series 5',
            },
          ],
        },
      },
    ];

    render(<ResultSection items={items} isSearchStart={false} />);
  });

  it('Should scroll to the top of the section when goToNextPage is called', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const items = [
      {
        id: 1,
        name: 'Item 1',
        thumbnail: {
          path: 'path/to/image1',
          extension: 'jpg',
        },
        description: 'Description of item 1',
        comics: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI1',
          items: [
            {
              resourceURI: 'resourceURI1',
              name: 'Comic 1',
            },
            {
              resourceURI: 'resourceURI2',
              name: 'Comic 2',
            },
          ],
        },
        series: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI3',
          items: [
            {
              resourceURI: 'resourceURI3',
              name: 'Series 1',
            },
            {
              resourceURI: 'resourceURI4',
              name: 'Series 2',
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Item 2',
        thumbnail: {
          path: 'path/to/image2',
          extension: 'png',
        },
        description: 'Description of item 2',
        comics: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI5',
          items: [
            {
              resourceURI: 'resourceURI5',
              name: 'Comic 3',
            },
            {
              resourceURI: 'resourceURI6',
              name: 'Comic 4',
            },
            {
              resourceURI: 'resourceURI7',
              name: 'Comic 5',
            },
          ],
        },
        series: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI8',
          items: [
            {
              resourceURI: 'resourceURI8',
              name: 'Series 3',
            },
            {
              resourceURI: 'resourceURI9',
              name: 'Series 4',
            },
            {
              resourceURI: 'resourceURI10',
              name: 'Series 5',
            },
          ],
        },
      },
    ];
    const resultSection = new ResultSection({ items, isSearchStart: false });
    const scrollToHeadSpy = vi.spyOn(resultSection, 'scrollToHead');
    resultSection.goToNextPage();

    expect(scrollToHeadSpy.mock.calls.length).toBe(1);
  });

  it('Should scroll to the top of the section when goToPrevPage is called', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const items = [
      {
        id: 1,
        name: 'Item 1',
        thumbnail: {
          path: 'path/to/image1',
          extension: 'jpg',
        },
        description: 'Description of item 1',
        comics: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI1',
          items: [
            {
              resourceURI: 'resourceURI1',
              name: 'Comic 1',
            },
            {
              resourceURI: 'resourceURI2',
              name: 'Comic 2',
            },
          ],
        },
        series: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI3',
          items: [
            {
              resourceURI: 'resourceURI3',
              name: 'Series 1',
            },
            {
              resourceURI: 'resourceURI4',
              name: 'Series 2',
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Item 2',
        thumbnail: {
          path: 'path/to/image2',
          extension: 'png',
        },
        description: 'Description of item 2',
        comics: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI5',
          items: [
            {
              resourceURI: 'resourceURI5',
              name: 'Comic 3',
            },
            {
              resourceURI: 'resourceURI6',
              name: 'Comic 4',
            },
            {
              resourceURI: 'resourceURI7',
              name: 'Comic 5',
            },
          ],
        },
        series: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI8',
          items: [
            {
              resourceURI: 'resourceURI8',
              name: 'Series 3',
            },
            {
              resourceURI: 'resourceURI9',
              name: 'Series 4',
            },
            {
              resourceURI: 'resourceURI10',
              name: 'Series 5',
            },
          ],
        },
      },
    ];
    const resultSection = new ResultSection({ items, isSearchStart: false });
    const scrollToHeadSpy = vi.spyOn(resultSection, 'scrollToHead');
    resultSection.goToPrevPage();

    expect(scrollToHeadSpy.mock.calls.length).toBe(1);
  });

  it('Should update state when items prop changes', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const initialItems = [
      {
        id: 1,
        name: 'Item 1',
        thumbnail: {
          path: 'path/to/image1',
          extension: 'jpg',
        },
        description: 'Description of item 1',
        comics: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI1',
          items: [
            {
              resourceURI: 'resourceURI1',
              name: 'Comic 1',
            },
            {
              resourceURI: 'resourceURI2',
              name: 'Comic 2',
            },
          ],
        },
        series: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI3',
          items: [
            {
              resourceURI: 'resourceURI3',
              name: 'Series 1',
            },
            {
              resourceURI: 'resourceURI4',
              name: 'Series 2',
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Item 2',
        thumbnail: {
          path: 'path/to/image2',
          extension: 'png',
        },
        description: 'Description of item 2',
        comics: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI5',
          items: [
            {
              resourceURI: 'resourceURI5',
              name: 'Comic 3',
            },
            {
              resourceURI: 'resourceURI6',
              name: 'Comic 4',
            },
            {
              resourceURI: 'resourceURI7',
              name: 'Comic 5',
            },
          ],
        },
        series: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI8',
          items: [
            {
              resourceURI: 'resourceURI8',
              name: 'Series 3',
            },
            {
              resourceURI: 'resourceURI9',
              name: 'Series 4',
            },
            {
              resourceURI: 'resourceURI10',
              name: 'Series 5',
            },
          ],
        },
      },
    ];
    const updatedItems = [
      {
        id: 1,
        name: 'Item 1',
        thumbnail: {
          path: 'path/to/image1',
          extension: 'jpg',
        },
        description: 'Description of item 1',
        comics: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI1',
          items: [
            {
              resourceURI: 'resourceURI1',
              name: 'Comic 1',
            },
            {
              resourceURI: 'resourceURI2',
              name: 'Comic 2',
            },
          ],
        },
        series: {
          available: 2,
          returned: 2,
          collectionURI: 'collectionURI3',
          items: [
            {
              resourceURI: 'resourceURI3',
              name: 'Series 1',
            },
            {
              resourceURI: 'resourceURI4',
              name: 'Series 2',
            },
          ],
        },
      },
      {
        id: 2,
        name: 'Item 2',
        thumbnail: {
          path: 'path/to/image2',
          extension: 'png',
        },
        description: 'Description of item 2',
        comics: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI5',
          items: [
            {
              resourceURI: 'resourceURI5',
              name: 'Comic 3',
            },
            {
              resourceURI: 'resourceURI6',
              name: 'Comic 4',
            },
            {
              resourceURI: 'resourceURI7',
              name: 'Comic 5',
            },
          ],
        },
        series: {
          available: 3,
          returned: 3,
          collectionURI: 'collectionURI8',
          items: [
            {
              resourceURI: 'resourceURI8',
              name: 'Series 3',
            },
            {
              resourceURI: 'resourceURI9',
              name: 'Series 4',
            },
            {
              resourceURI: 'resourceURI10',
              name: 'Series 5',
            },
          ],
        },
      },
    ];
    const resultSection = new ResultSection({ items: initialItems, isSearchStart: false });
    const setStateSpy = vi.spyOn(resultSection, 'setState');
    resultSection.componentDidUpdate({ items: updatedItems, isSearchStart: false });

    expect(setStateSpy.mock.calls.length).toBe(1);
    expect(resultSection.state.items).toStrictEqual(updatedItems);
    expect(resultSection.state.currentPage).toBe(0);
  });

  it('Renders "Nothing found" when items are empty and not loading', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const items: Item[] = [];
    const resultSection = new ResultSection({ items, isSearchStart: false });
    const { container } = render(resultSection.render());

    const resultHeader = container.querySelector('h2');
    expect(resultHeader).not.toBeNull();
    if (resultHeader) {
      expect(resultHeader.textContent).toBe('Nothing found');
    }
  });

  it('Renders nothing when loading', () => {
    HTMLElement.prototype.scrollIntoView = vi.fn();
    const items: Item[] = [];
    const resultSection = new ResultSection({ items, isSearchStart: true });
    const { container } = render(resultSection.render());

    const resultHeader = container.querySelector('h2');
    expect(resultHeader).toBeNull();
  });
});
