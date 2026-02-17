import { useData } from 'vike-react/useData';
import type { Data } from './+data';

// Section renderers
function TextSection({ section }: { section: any }) {
  const themeClasses = {
    default: 'bg-white text-black',
    dark: 'bg-[#0a0a0a] text-white',
    gray: 'bg-gray-100 text-black',
  };
  const theme = section.theme || 'default';
  
  return (
    <section className={`py-16 ${themeClasses[theme as keyof typeof themeClasses]}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{section.heading}</h2>
        {section.content && (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: renderRichText(section.content) }}
          />
        )}
      </div>
    </section>
  );
}

function TableSection({ section }: { section: any }) {
  const themeClasses = {
    default: 'bg-white',
    dark: 'bg-[#0a0a0a] text-white',
    gray: 'bg-gray-100',
  };
  const theme = section.theme || 'default';
  
  return (
    <section className={`py-16 ${themeClasses[theme as keyof typeof themeClasses]}`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        {section.heading && (
          <h2 className="text-3xl md:text-4xl font-bold mb-8">{section.heading}</h2>
        )}
        <table className="w-full border-collapse">
          {section.tableHeadings?.length > 0 && (
            <thead>
              <tr>
                {section.tableHeadings.map((h: any, i: number) => (
                  <th key={i} className="text-left p-4 border-b-2 border-current font-semibold">
                    {h.heading}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {section.rows?.map((row: any, i: number) => (
              <tr key={i} className="border-b border-gray-200">
                <td className="p-4 font-medium">{row.col1}</td>
                <td className="p-4">{row.col2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BlockquoteSection({ section }: { section: any }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <blockquote className="text-2xl md:text-3xl font-medium italic text-center max-w-4xl mx-auto">
          "{section.quote}"
          {section.attribution && (
            <footer className="mt-4 text-base font-normal text-gray-500">
              — {section.attribution}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
}

function ImageSection({ section }: { section: any }) {
  const isFullWidth = section.fullWidth;
  
  return (
    <section className={`py-8 ${isFullWidth ? 'bg-[#0a0a0a]' : ''}`}>
      <div className={isFullWidth ? 'max-w-full' : 'max-w-[1400px] mx-auto px-4 md:px-16'}>
        {section.image?.url && (
          <img 
            src={section.image.url} 
            alt={section.image.alt || section.caption || ''} 
            className="w-full h-auto"
          />
        )}
        {section.caption && (
          <p className={`text-sm mt-4 text-center ${isFullWidth ? 'text-gray-400' : 'text-gray-500'}`}>{section.caption}</p>
        )}
      </div>
    </section>
  );
}

function ImageGridSection({ section }: { section: any }) {
  return (
    <section className="py-8 bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {section.images?.map((item: any, i: number) => (
            <div key={i}>
              {item.image?.url && (
                <img 
                  src={item.image.url} 
                  alt={item.image.alt || item.caption || ''} 
                  className="w-full h-auto rounded-lg"
                />
              )}
              {item.caption && (
                <p className="text-sm text-gray-400 mt-3 text-center">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ColorSwatchesSection({ section }: { section: any }) {
  return (
    <section className="py-16">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <div className="flex flex-wrap gap-6 justify-center">
          {section.colors?.map((color: any, i: number) => (
            <div key={i} className="text-center">
              <div 
                className="w-24 h-24 rounded-full shadow-lg mb-2"
                style={{ backgroundColor: color.hex }}
              />
              {color.label && (
                <p className="text-sm font-medium">{color.label}</p>
              )}
              <p className="text-xs text-gray-400 uppercase">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OutcomeGridSection({ section }: { section: any }) {
  return (
    <section className="py-8">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {section.items?.map((item: any, i: number) => (
            <div key={i} className="border border-[#42CDDD] rounded-lg p-4 flex items-center gap-3">
              <span className="text-[#42CDDD] text-xl">✓</span>
              <p className="font-medium text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PlaceholderSection({ section }: { section: any }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 md:px-16 text-center">
        <p className="text-gray-400 text-sm uppercase tracking-widest">{section.label || 'Placeholder'}</p>
        {section.description && (
          <p className="text-gray-500 mt-2">{section.description}</p>
        )}
      </div>
    </section>
  );
}

// Simple rich text renderer (PayloadCMS returns serialized Slate/Lexical)
function renderRichText(content: any): string {
  if (!content) return '';
  if (typeof content === 'string') return content;
  
  // Handle Lexical format (PayloadCMS 2.x+)
  if (content.root?.children) {
    return content.root.children.map((node: any) => renderNode(node)).join('');
  }
  
  // Handle array of nodes (Slate format)
  if (Array.isArray(content)) {
    return content.map((node: any) => renderNode(node)).join('');
  }
  
  return '';
}

function renderNode(node: any): string {
  if (!node) return '';
  
  // Text node
  if (node.text !== undefined) {
    let text = node.text;
    if (node.bold) text = `<strong>${text}</strong>`;
    if (node.italic) text = `<em>${text}</em>`;
    if (node.underline) text = `<u>${text}</u>`;
    return text;
  }
  
  // Element nodes
  const children = node.children?.map((child: any) => renderNode(child)).join('') || '';
  
  switch (node.type) {
    case 'paragraph':
    case 'p':
      return `<p class="mb-4">${children}</p>`;
    case 'heading':
    case 'h1':
    case 'h2':
    case 'h3':
      const level = node.tag || node.type?.replace('h', '') || '2';
      return `<h${level} class="text-2xl font-bold mt-8 mb-4">${children}</h${level}>`;
    case 'ul':
    case 'list':
      if (node.listType === 'bullet' || node.tag === 'ul') {
        return `<ul class="list-disc pl-6 mb-4">${children}</ul>`;
      }
      return `<ol class="list-decimal pl-6 mb-4">${children}</ol>`;
    case 'li':
    case 'listitem':
      return `<li class="mb-1">${children}</li>`;
    case 'link':
      return `<a href="${node.url || '#'}" class="text-blue-600 underline">${children}</a>`;
    default:
      return children;
  }
}

function renderSection(section: any, index: number) {
  const key = `section-${index}`;
  
  switch (section.blockType) {
    case 'textSection':
      return <TextSection key={key} section={section} />;
    case 'tableSection':
      return <TableSection key={key} section={section} />;
    case 'blockquote':
      return <BlockquoteSection key={key} section={section} />;
    case 'image':
      return <ImageSection key={key} section={section} />;
    case 'imageGrid':
      return <ImageGridSection key={key} section={section} />;
    case 'colorSwatches':
      return <ColorSwatchesSection key={key} section={section} />;
    case 'outcomeGrid':
      return <OutcomeGridSection key={key} section={section} />;
    case 'placeholder':
      return <PlaceholderSection key={key} section={section} />;
    default:
      return null;
  }
}

export default function Page() {
  const { caseStudy } = useData<Data>();

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Case study not found</p>
      </div>
    );
  }

  return (
    <div className="font-['Space_Grotesk',sans-serif] bg-white text-[#0a0a0a] leading-relaxed text-lg">
      {/* Back Link */}
      <a 
        href="/" 
        className="fixed top-8 left-8 text-sm font-medium no-underline flex items-center gap-2 z-50 bg-white px-4 py-2 rounded-full shadow-md hover:bg-black hover:text-white transition-all"
      >
        ← Back
      </a>

      {/* Hero */}
      <section className="pt-24 pb-8">
        <div className="max-w-[1400px] mx-auto px-4 md:px-16">
          <p className="text-sm uppercase tracking-[0.15em] text-gray-400 mb-6 font-medium">
            {caseStudy.heroTag || 'Case Study'}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            {caseStudy.title}
          </h1>
          {caseStudy.subtitle && (
            <p className="text-xl md:text-2xl text-gray-600 max-w-[50ch] mb-4">
              {caseStudy.subtitle}
            </p>
          )}
          {caseStudy.heroStatement && (
            <p className="text-xl font-medium text-black">
              {caseStudy.heroStatement}
            </p>
          )}
        </div>
      </section>

      {/* Hero Image */}
      {caseStudy.heroImage?.url && (
        <div 
          className="w-full h-[60vh] min-h-[400px] bg-fixed bg-center bg-no-repeat bg-cover"
          style={{ backgroundImage: `url(${caseStudy.heroImage.url})` }}
          role="img"
          aria-label={caseStudy.heroImage.alt || caseStudy.title}
        />
      )}

      {/* Meta Grid */}
      {caseStudy.meta && caseStudy.meta.length > 0 && (
        <section className="py-6">
          <div className="max-w-[1400px] mx-auto px-4 md:px-16">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-6 border-y border-gray-200">
              {caseStudy.meta.map((item: any, index: number) => (
                <div key={index} className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-[0.1em] text-gray-400 font-medium">
                    {item.label}
                  </span>
                  <span className="font-semibold text-black text-sm">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {caseStudy.sections?.map((section: any, index: number) => 
        renderSection(section, index)
      )}

      {/* Footer */}
      {(caseStudy.footerTagline || caseStudy.credits?.length > 0) && (
        <section className="text-center py-16 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 md:px-16">
            {caseStudy.footerTagline && (
              <p className="text-xl md:text-2xl font-semibold mb-2">
                {caseStudy.footerTagline}
              </p>
            )}
            {caseStudy.footerSubtitle && (
              <p className="text-gray-400 italic mb-12">
                {caseStudy.footerSubtitle}
              </p>
            )}
            {caseStudy.credits && caseStudy.credits.length > 0 && (
              <div className="flex justify-center gap-12 flex-wrap">
                {caseStudy.credits.map((credit: any, index: number) => (
                  <div key={index} className="text-center">
                    <span className="text-xs uppercase tracking-[0.1em] text-gray-400 block mb-1">
                      {credit.role}
                    </span>
                    <span className="font-semibold">{credit.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
