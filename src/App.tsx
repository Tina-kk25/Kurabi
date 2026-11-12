import React, { useState } from 'react';

// --- インラインSVGアイコン（サイズ固定） ---
const PlusIcon = () => <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>;
const TrashIcon = () => <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>;
const EditIcon = () => <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>;
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg style={{ width: '14px', height: '14px', flexShrink: 0, color: filled ? '#f59e0b' : '#cbd5e1', fill: filled ? '#f59e0b' : 'none' }} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
  </svg>
);
const FilterIcon = () => <svg style={{ width: '12px', height: '12px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>;
const GridIcon = () => <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>;
const LayoutGridIcon = () => <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>;
const SparklesIcon = () => <svg style={{ width: '14px', height: '14px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>;
const XIcon = () => <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>;

interface Criteria { id: string; name: string; weight: number; }
interface Item { id: string; name: string; category: string; pros: string[]; cons: string[]; ratings: Record<string, number>; memo: string; }
interface Project { id: string; title: string; criteria: Criteria[]; items: Item[]; }

const initialProject: Project = {
  id: 'p1',
  title: '生成AIツールの比較・選定',
  criteria: [
    { id: 'c1', name: '回答精度', weight: 5 },
    { id: 'c2', name: '使いやすさ', weight: 4 },
    { id: 'c3', name: 'コスパ', weight: 3 }
  ],
  items: [
    { id: 'i1', name: 'ChatGPT (GPT-4o)', category: 'AIツール', pros: ['高い汎用性'], cons: ['月額20ドル'], ratings: { 'c1': 5, 'c2': 5, 'c3': 3 }, memo: 'メイン候補' },
    { id: 'i2', name: 'Claude 3.5 Sonnet', category: 'AIツール', pros: ['自然な日本語'], cons: ['画像生成不可'], ratings: { 'c1': 5, 'c2': 4, 'c3': 3 }, memo: '開発作業に最適' },
    { id: 'i3', name: 'Google Gemini Pro', category: 'AIツール', pros: ['長文一括処理'], cons: ['指示への従順さ'], ratings: { 'c1': 4, 'c2': 4, 'c3': 4 }, memo: '資料要約に便利' }
  ]
};

export default function App() {
  const [project, setProject] = useState<Project>(initialProject);
  const [activeTab, setActiveTab] = useState<'board' | 'matrix'>('board');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [minScore, setMinScore] = useState<number>(0);

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Item> | null>(null);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
  const [isRouletteModalOpen, setIsRouletteModalOpen] = useState(false);

  const [rouletteFilter, setRouletteFilter] = useState<'all' | 'highScore'>('all');
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState<Item | null>(null);

  const calculateScore = (item: Item): number => {
    if (project.criteria.length === 0) return 0;
    let totalWeight = 0;
    let weightedScore = 0;
    project.criteria.forEach(c => {
      const rating = item.ratings[c.id] || 0;
      weightedScore += rating * c.weight;
      totalWeight += 5 * c.weight;
    });
    return totalWeight > 0 ? Math.round((weightedScore / totalWeight) * 100) : 0;
  };

  const categories = Array.from(new Set(project.items.map(i => i.category).filter(Boolean)));

  const filteredItems = project.items.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesScore = calculateScore(item) >= minScore;
    return matchesCategory && matchesScore;
  });

  const handleSaveItem = () => {
    if (!editingItem?.name) return;
    if (editingItem.id) {
      setProject(prev => ({
        ...prev,
        items: prev.items.map(i => i.id === editingItem.id ? (editingItem as Item) : i)
      }));
    } else {
      const newItem: Item = {
        id: 'i_' + Date.now(),
        name: editingItem.name || '新しい候補',
        category: editingItem.category || '全般',
        pros: editingItem.pros || [],
        cons: editingItem.cons || [],
        ratings: editingItem.ratings || {},
        memo: editingItem.memo || ''
      };
      setProject(prev => ({ ...prev, items: [...prev.items, newItem] }));
    }
    setIsItemModalOpen(false);
    setEditingItem(null);
  };

  const runRoulette = () => {
    let pool = rouletteFilter === 'all' ? project.items : project.items.filter(i => calculateScore(i) >= 75);
    if (pool.length === 0) { alert('条件に合う候補がありません'); return; }
    setIsSpinning(true);
    setSelectedWinner(null);
    setTimeout(() => {
      setSelectedWinner(pool[Math.floor(Math.random() * pool.length)]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#1e293b', width: '100%', maxWidth: '100%', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* ヘッダー（強制横並び・flex-shrinkなしで潰れ防止） */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '0 12px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
          <div style={{ backgroundColor: '#f59e0b', color: '#ffffff', fontWeight: 'bold', width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>く</div>
          <h1 style={{ margin: 0, fontSize: '15px', fontWeight: '900', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Kurabi <span style={{ fontSize: '10px', backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '10px' }}>くらび</span></h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{ backgroundColor: '#f1f5f9', padding: '2px', borderRadius: '8px', display: 'flex', gap: '2px' }}>
            <button onClick={() => setActiveTab('board')} style={{ border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 'board' ? '#ffffff' : 'transparent', color: activeTab === 'board' ? '#0f172a' : '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <LayoutGridIcon /><span>ボード</span>
            </button>
            <button onClick={() => setActiveTab('matrix')} style={{ border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', backgroundColor: activeTab === 'matrix' ? '#ffffff' : 'transparent', color: activeTab === 'matrix' ? '#0f172a' : '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <GridIcon /><span>マトリクス</span>
            </button>
          </div>
          <button onClick={() => setIsRouletteModalOpen(true)} style={{ border: 'none', background: 'linear-gradient(to right, #f59e0b, #ea580c)', color: '#ffffff', padding: '5px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
            <SparklesIcon /><span>ルーレット</span>
          </button>
        </div>
      </header>

      {/* フィルターバー */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '8px 12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
          <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold', flexShrink: 0 }}>テーマ:</span>
          <h2 style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.title}</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '6px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FilterIcon />
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: 'bold', fontSize: '11px' }}>
              <option value="all">すべて</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <button onClick={() => setIsCriteriaModalOpen(true)} style={{ border: '1px solid #c7d2fe', backgroundColor: '#e0e7ff', color: '#4338ca', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>⚙ 科目</button>
          <button onClick={() => { setEditingItem({ name: '', category: categories[0] || '全般', pros: [''], cons: [''], ratings: {}, memo: '' }); setIsItemModalOpen(true); }} style={{ border: 'none', backgroundColor: '#0f172a', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <PlusIcon /><span>追加</span>
          </button>
        </div>
      </div>

      {/* メインエリア */}
      <main style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
        {activeTab === 'board' ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'flex-start' }}>
            {filteredItems.map(item => {
              const score = calculateScore(item);
              return (
                <div key={item.id} style={{ width: '100%', maxWidth: '320px', flex: '1 1 260px', backgroundColor: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  <div style={{ padding: '10px 12px', borderBottom: '1px solid #f1f5f9', backgroundColor: '#f8fafc', borderRadius: '14px 14px 0 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#4946e5', backgroundColor: '#eeefbe', padding: '2px 6px', borderRadius: '8px' }}>{item.category}</span>
                      <h3 style={{ margin: '3px 0 0 0', fontSize: '13px', fontWeight: 'bold' }}>{item.name}</h3>
                    </div>
                    <div style={{ backgroundColor: '#f59e0b', color: '#0f172a', fontWeight: '900', padding: '3px 8px', borderRadius: '8px', fontSize: '12px' }}>{score}点</div>
                  </div>

                  <div style={{ padding: '10px 12px', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                    {item.pros[0] && <div><span style={{ color: '#059669', fontWeight: 'bold' }}>👍 長所:</span> {item.pros[0]}</div>}
                    {item.cons[0] && <div><span style={{ color: '#e11d48', fontWeight: 'bold' }}>👎 短所:</span> {item.cons[0]}</div>}
                    {item.memo && <div style={{ backgroundColor: '#fffbeb', padding: '6px', borderRadius: '6px', border: '1px solid #fef3c7', fontStyle: 'italic', color: '#475569' }}>"{item.memo}"</div>}
                  </div>

                  <div style={{ padding: '8px 12px', backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9', borderRadius: '0 0 14px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: '#94a3b8' }}>
                    <span>評価: {Object.keys(item.ratings).length}件</span>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button onClick={() => { setEditingItem(item); setIsItemModalOpen(true); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#475569', padding: '2px' }}><EditIcon /></button>
                      <button onClick={() => setProject(prev => ({ ...prev, items: prev.items.filter(i => i.id !== item.id) }))} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#f43f5e', padding: '2px' }}><TrashIcon /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflowX: 'auto', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', minWidth: '450px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                  <th style={{ padding: '10px' }}>候補名</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>スコア</th>
                  {project.criteria.map(c => <th key={c.id} style={{ padding: '10px' }}>{c.name}</th>)}
                  <th style={{ padding: '10px', textAlign: 'center' }}>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{item.name}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}><span style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>{calculateScore(item)}点</span></td>
                    {project.criteria.map(c => (
                      <td key={c.id} style={{ padding: '10px' }}>
                        <div style={{ display: 'flex' }}>{[1,2,3,4,5].map(s => <StarIcon key={s} filled={s <= (item.ratings[c.id] || 0)} />)}</div>
                      </td>
                    ))}
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button onClick={() => { setEditingItem(item); setIsItemModalOpen(true); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#475569' }}><EditIcon /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* モーダル: 候補編集 */}
      {isItemModalOpen && editingItem && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', maxWidth: '360px', width: '100%', padding: '16px', fontSize: '11px', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '13px' }}>{editingItem.id ? '編集' : '追加'}</h3>
              <button onClick={() => setIsItemModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><XIcon /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>名称 *</label>
                <input type="text" value={editingItem.name || ''} onChange={e => setEditingItem({ ...editingItem, name: e.target.value })} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>カテゴリ</label>
                <input type="text" value={editingItem.category || ''} onChange={e => setEditingItem({ ...editingItem, category: e.target.value })} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>評価 (1〜5点)</label>
                {project.criteria.map(c => (
                  <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px', backgroundColor: '#ffffff', padding: '4px 6px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                    <span>{c.name}</span>
                    <div style={{ display: 'flex' }}>
                      {[1,2,3,4,5].map(s => (
                        <button key={s} type="button" onClick={() => setEditingItem({ ...editingItem, ratings: { ...(editingItem.ratings || {}), [c.id]: s } })} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0 2px' }}>
                          <StarIcon filled={s <= (editingItem.ratings?.[c.id] || 0)} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '3px' }}>メモ</label>
                <textarea rows={2} value={editingItem.memo || ''} onChange={e => setEditingItem({ ...editingItem, memo: e.target.value })} style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
              <button onClick={() => setIsItemModalOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '6px 10px' }}>キャンセル</button>
              <button onClick={handleSaveItem} style={{ border: 'none', backgroundColor: '#f59e0b', color: '#0f172a', fontWeight: 'bold', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>保存</button>
            </div>
          </div>
        </div>
      )}

      {/* モーダル: 評価科目 */}
      {isCriteriaModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', maxWidth: '320px', width: '100%', padding: '16px', fontSize: '11px', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '13px' }}>評価項目の設定</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
              {project.criteria.map((c, index) => (
                <div key={c.id} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input type="text" value={c.name} onChange={e => { const updated = [...project.criteria]; updated[index].name = e.target.value; setProject({ ...project, criteria: updated }); }} style={{ flex: 1, padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
                  <select value={c.weight} onChange={e => { const updated = [...project.criteria]; updated[index].weight = Number(e.target.value); setProject({ ...project, criteria: updated }); }} style={{ padding: '4px', borderRadius: '4px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>
                    {[1,2,3,4,5].map(w => <option key={w} value={w}>×{w}</option>)}
                  </select>
                  <button onClick={() => setProject({ ...project, criteria: project.criteria.filter((_, i) => i !== index) })} style={{ border: 'none', background: 'none', color: '#f43f5e', cursor: 'pointer' }}>削除</button>
                </div>
              ))}
            </div>
            <button onClick={() => setProject({ ...project, criteria: [...project.criteria, { id: 'c_' + Date.now(), name: '新科目', weight: 3 }] })} style={{ border: 'none', background: 'none', color: '#4338ca', fontWeight: 'bold', marginTop: '8px', cursor: 'pointer' }}>+ 科目を追加</button>
            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsCriteriaModalOpen(false)} style={{ border: 'none', backgroundColor: '#0f172a', color: '#ffffff', fontWeight: 'bold', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>完了</button>
            </div>
          </div>
        </div>
      )}

      {/* モーダル: ルーレット */}
      {isRouletteModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', maxWidth: '280px', width: '100%', padding: '16px', textAlign: 'center', fontSize: '11px', boxSizing: 'border-box' }}>
            <h3 style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '13px' }}>意思決定ルーレット</h3>
            <div style={{ backgroundColor: '#f8fafc', padding: '6px', borderRadius: '6px', textAlign: 'left', marginBottom: '10px' }}>
              <label style={{ display: 'block', cursor: 'pointer' }}>
                <input type="radio" name="rFilter" checked={rouletteFilter === 'all'} onChange={() => setRouletteFilter('all')} /> 全候補から
              </label>
              <label style={{ display: 'block', cursor: 'pointer', marginTop: '3px' }}>
                <input type="radio" name="rFilter" checked={rouletteFilter === 'highScore'} onChange={() => setRouletteFilter('highScore')} /> 高評価(75点以上)から
              </label>
            </div>
            <div style={{ minHeight: '50px', backgroundColor: '#fffbeb', border: '1px dashed #fde68a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              {isSpinning ? <span style={{ fontWeight: 'bold', color: '#d97706' }}>回転中...</span> : selectedWinner ? <div><span style={{ backgroundColor: '#f59e0b', padding: '2px 4px', borderRadius: '3px', fontSize: '9px', fontWeight: 'bold' }}>決定</span><h4 style={{ margin: '3px 0 0 0', fontSize: '13px' }}>{selectedWinner.name}</h4></div> : <span style={{ color: '#94a3b8' }}>スタートを押してください</span>}
            </div>
            <button onClick={runRoulette} disabled={isSpinning} style={{ width: '100%', border: 'none', backgroundColor: '#f59e0b', color: '#0f172a', fontWeight: 'bold', padding: '8px', borderRadius: '8px', cursor: 'pointer' }}>回す！</button>
            <button onClick={() => setIsRouletteModalOpen(false)} style={{ border: 'none', background: 'none', color: '#94a3b8', marginTop: '6px', cursor: 'pointer', fontSize: '10px' }}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
}