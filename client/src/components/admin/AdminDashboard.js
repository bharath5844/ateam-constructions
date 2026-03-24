import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ImageCropper from './ImageCropper';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import {
  getProjects, addProject, deleteProject,
  getServices, updateService,
  getEnquiries, updateEnquiry, deleteEnquiry,
  getAbout, updateAbout
} from '../../firebaseService';
import './AdminDashboard.css';

const TABS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'projects', label: 'Projects', icon: '🏗️' },
  { id: 'enquiries', label: 'Enquiries', icon: '📬' },
  { id: 'services', label: 'Services', icon: '⚙️' },
  { id: 'about', label: 'About Info', icon: '🏢' },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState('overview');
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => { await logout(); navigate('/admin'); };

  return (
    <div className="admin-dash">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img src="/logo.png" alt="Logo" className="sidebar-logo" />
          <div>
            <div className="sidebar-brand-name">A-Team</div>
            <div className="sidebar-brand-sub">Admin Panel</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {TABS.map(t => (
            <button key={t.id} className={`sidebar-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <span className="sidebar-btn-icon">{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-user-avatar">A</div>
            <div>
              <div className="sidebar-user-name">{admin?.email}</div>
              <div className="sidebar-user-role">Administrator</div>
            </div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout}>Sign Out</button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <h1 className="admin-page-title">{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</h1>
          <a href="/" target="_blank" rel="noreferrer" className="view-site-btn">View Website ↗</a>
        </div>
        <div className="admin-content">
          {tab === 'overview' && <Overview setTab={setTab} />}
          {tab === 'projects' && <ProjectsAdmin />}
          {tab === 'enquiries' && <EnquiriesAdmin />}
          {tab === 'services' && <ServicesAdmin />}
          {tab === 'about' && <AboutAdmin />}
        </div>
      </main>
    </div>
  );
}

function Overview({ setTab }) {
  const [stats, setStats] = useState({ projects:0, enquiries:0, newEnquiries:0, services:0 });
  useEffect(() => {
    Promise.all([getProjects(), getEnquiries(), getServices()])
      .then(([p,e,s]) => {
        const projects = Array.isArray(p) ? p : [];
        const enquiries = Array.isArray(e) ? e : [];
        const services = Array.isArray(s) ? s : [];
        setStats({
          projects: projects.length,
          enquiries: enquiries.length,
          newEnquiries: enquiries.filter(x=>x.status==='new').length,
          services: services.filter(x=>x.active).length
        });
      }).catch(() => {});
  }, []);

  return (
    <div className="overview">
      <div className="overview-stats">
        {[
          {label:'Total Projects', value:stats.projects, icon:'🏗️', tab:'projects'},
          {label:'Total Enquiries', value:stats.enquiries, icon:'📬', tab:'enquiries'},
          {label:'New Enquiries', value:stats.newEnquiries, icon:'🔔', tab:'enquiries', highlight:true},
          {label:'Active Services', value:stats.services, icon:'⚙️', tab:'services'},
        ].map((s,i) => (
          <div key={i} className={`stat-card ${s.highlight?'highlight':''}`} onClick={() => setTab(s.tab)}>
            <div className="stat-card-icon">{s.icon}</div>
            <div className="stat-card-value">{s.value}</div>
            <div className="stat-card-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="overview-welcome">
        <h2>Welcome to A-Team Admin Panel</h2>
        <p>Manage your website content, projects, services, and client enquiries from here.</p>
        <div className="overview-quick">
          <button className="btn-primary" onClick={() => setTab('projects')}>+ Upload Project</button>
          <button className="btn-outline" onClick={() => setTab('enquiries')}>View Enquiries</button>
        </div>
      </div>
    </div>
  );
}

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({title:'', category:'residential', location:'', description:''});
  const [rawImageSrc, setRawImageSrc] = useState(null);
  const [croppedFile, setCroppedFile] = useState(null);
  const [croppedPreview, setCroppedPreview] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const fileRef = useRef();

  const load = () => getProjects().then(data => setProjects(Array.isArray(data) ? data : [])).catch(() => setProjects([]));
  useEffect(() => { load(); }, []);

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setRawImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(f);
    e.target.value = '';
  };

  const handleCropDone = (blob) => {
    setCroppedFile(blob);
    setCroppedPreview(URL.createObjectURL(blob));
    setShowCropper(false);
    setRawImageSrc(null);
  };

  const handleEdit = (p) => {
    setForm({ title: p.title, category: p.category, location: p.location || '', description: p.description || '' });
    setCroppedPreview(p.image); // Display existing image in preview
    setEditingId(p.id);
    setCroppedFile(null); // Reset cropped file since we're editing
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setForm({title:'', category:'residential', location:'', description:''});
    setCroppedFile(null);
    setCroppedPreview(null);
    setRawImageSrc(null);
    setProgress(0);
    setEditingId(null);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!editingId && !croppedFile) { toast.error('Please select and crop an image'); return; }
    if (!form.title) { toast.error('Please enter a project title'); return; }
    setLoading(true); setProgress(0);
    
    try {
      if (editingId) {
        // Handle Edit Update
        let updatedData = { ...form };
        
        if (croppedFile) {
          // If a new image was cropped, convert it to base64 and update it
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(croppedFile);
          });
          updatedData.image = base64;
        }

        await updateDoc(doc(db, 'projects', editingId), updatedData);
        toast.success('Project updated successfully!');
      } else {
        // Handle New Upload
        await addProject(form, croppedFile, setProgress);
        toast.success('Project uploaded successfully!');
      }
      resetForm();
      load();
    } catch(err) {
      toast.error((editingId ? 'Update' : 'Upload') + ' failed: ' + err.message);
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await deleteProject(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed to delete'); }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <p>{projects.length} project(s) uploaded</p>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>+ Upload New Project</button>
      </div>

      {showCropper && rawImageSrc && (
        <ImageCropper
          imageSrc={rawImageSrc}
          onCropDone={handleCropDone}
          onCancel={() => { setShowCropper(false); setRawImageSrc(null); }}
          aspect={4/3}
        />
      )}

      {showForm && !showCropper && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingId ? 'Edit Project' : 'Upload New Project'}</h3>
              <button className="modal-close" onClick={resetForm}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="upload-zone" onClick={() => fileRef.current?.click()}>
                {croppedPreview
                  ? (
                    <div className="upload-preview-wrap">
                      <img src={croppedPreview} alt="preview" className="upload-preview" />
                      <div className="upload-preview-change">Click to change & re-crop</div>
                    </div>
                  )
                  : (
                    <div className="upload-placeholder">
                      <div className="upload-icon">📁</div>
                      <div>Click to select image</div>
                      <div className="upload-hint">You'll crop it next • JPG, PNG up to 10MB</div>
                    </div>
                  )
                }
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{display:'none'}} />
              </div>

              {loading && progress > 0 && !editingId && (
                <div className="upload-progress">
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{width:`${progress}%`}} />
                  </div>
                  <span>{progress}% uploading...</span>
                </div>
              )}

              <div className="form-row-2">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input value={form.title} onChange={e => setForm(f=>({...f,title:e.target.value}))} placeholder="e.g. 4BHK Villa, Hyderabad" required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e => setForm(f=>({...f,category:e.target.value}))}>
                    {['residential','commercial','interior','development'].map(c => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Location</label>
                <input value={form.location} onChange={e => setForm(f=>({...f,location:e.target.value}))} placeholder="e.g. Hyderabad, Shankarpalle" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea value={form.description} onChange={e => setForm(f=>({...f,description:e.target.value}))} rows={3} placeholder="Brief description..." />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={resetForm}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : (editingId ? 'Save Changes' : 'Upload Project')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="projects-admin-grid">
        {projects.map(p => (
          <div key={p.id} className="project-admin-card">
            <div className="pac-img-wrap">
              <img src={p.image} alt={p.title} className="pac-img" onError={e => e.target.style.opacity='0.3'} />
              <div className="pac-cat">{p.category}</div>
              <div className="pac-actions">
                <button className="pac-edit" onClick={() => handleEdit(p)} title="Edit Project">✏️</button>
                <button className="pac-delete" onClick={() => handleDelete(p.id)} title="Delete Project">🗑️</button>
              </div>
            </div>
            <div className="pac-body">
              <div className="pac-title">{p.title}</div>
              {p.location && <div className="pac-loc">📍 {p.location}</div>}
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🏗️</div>
            <p>No projects yet. Upload your first project!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState([]);
  const [filter, setFilter] = useState('all');

  const load = () => getEnquiries().then(data => setEnquiries(Array.isArray(data) ? data : [])).catch(() => setEnquiries([]));
  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try { await updateEnquiry(id, {status}); load(); toast.success('Updated'); }
    catch { toast.error('Failed'); }
  };

  const del = async id => {
    if (!window.confirm('Delete this enquiry?')) return;
    try { await deleteEnquiry(id); load(); toast.success('Deleted'); }
    catch { toast.error('Failed'); }
  };

  const filtered = filter === 'all' ? enquiries : enquiries.filter(e => e.status === filter);

  return (
    <div className="admin-section">
      <div className="admin-section-header">
        <div className="enquiry-filters">
          {['all','new','contacted','closed'].map(f => (
            <button key={f} className={`filter-chip ${filter===f?'active':''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
              {f==='new' && enquiries.filter(e=>e.status==='new').length > 0 && (
                <span className="badge">{enquiries.filter(e=>e.status==='new').length}</span>
              )}
            </button>
          ))}
        </div>
        <p>{filtered.length} enquiries</p>
      </div>
      <div className="enquiries-list">
        {filtered.map(e => (
          <div key={e.id} className={`enquiry-card ${e.status}`}>
            <div className="enq-header">
              <div>
                <div className="enq-name">{e.name}</div>
                <div className="enq-meta">
                  <a href={`tel:${e.phone}`}>📞 {e.phone}</a>
                  {e.email && <a href={`mailto:${e.email}`}>✉️ {e.email}</a>}
                </div>
              </div>
              <div className="enq-right">
                <span className={`enq-status ${e.status}`}>{e.status}</span>
                <div className="enq-date">{e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-IN') : ''}</div>
              </div>
            </div>
            <div className="enq-service">Service: <strong>{e.service}</strong></div>
            {e.message && <div className="enq-message">"{e.message}"</div>}
            <div className="enq-actions">
              {['new','contacted','closed'].map(s => (
                <button key={s} className={`enq-action-btn ${e.status===s?'current':''}`} onClick={() => updateStatus(e.id, s)}>
                  {s.charAt(0).toUpperCase()+s.slice(1)}
                </button>
              ))}
              <button className="enq-action-btn delete" onClick={() => del(e.id)}>Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state"><div className="empty-icon">📬</div><p>No enquiries found</p></div>
        )}
      </div>
    </div>
  );
}

function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => getServices().then(data => setServices(Array.isArray(data) ? data : [])).catch(() => setServices([]));
  useEffect(() => { load(); }, []);

  const toggleActive = async (id, active) => {
    try { await updateService(id, {active: !active}); load(); }
    catch { toast.error('Failed'); }
  };

  const saveEdit = async () => {
    try { await updateService(editing.id, editing); load(); setEditing(null); toast.success('Saved!'); }
    catch { toast.error('Failed'); }
  };

  return (
    <div className="admin-section">
      <p className="admin-section-desc">Toggle services on/off or edit their content on the website.</p>
      <div className="services-admin-list">
        {services.map(s => (
          <div key={s.id} className={`service-admin-card ${!s.active?'inactive':''}`}>
            {editing?.id === s.id ? (
              <div className="service-edit-form">
                <div className="form-row-2">
                  <div className="form-group"><label>Icon</label><input value={editing.icon} onChange={e => setEditing(x=>({...x,icon:e.target.value}))} /></div>
                  <div className="form-group"><label>Name</label><input value={editing.name} onChange={e => setEditing(x=>({...x,name:e.target.value}))} /></div>
                </div>
                <div className="form-group"><label>Description</label><textarea value={editing.description} onChange={e => setEditing(x=>({...x,description:e.target.value}))} rows={3} /></div>
                <div className="modal-actions">
                  <button className="btn-outline" onClick={() => setEditing(null)}>Cancel</button>
                  <button className="btn-primary" onClick={saveEdit}>Save Changes</button>
                </div>
              </div>
            ) : (
              <>
                <div className="sac-icon">{s.icon}</div>
                <div className="sac-body"><div className="sac-name">{s.name}</div><div className="sac-desc">{s.description}</div></div>
                <div className="sac-actions">
                  <button className="sac-edit" onClick={() => setEditing({...s})}>✏️ Edit</button>
                  <label className="toggle">
                    <input type="checkbox" checked={!!s.active} onChange={() => toggleActive(s.id, s.active)} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutAdmin() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getAbout().then(setAbout).catch(() => {}); }, []);

  const save = async () => {
    setLoading(true);
    try { await updateAbout(about); toast.success('Saved!'); }
    catch { toast.error('Failed'); }
    finally { setLoading(false); }
  };

  if (!about) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-section">
      <div className="about-admin-form">
        <div className="form-group"><label>Company Description</label><textarea value={about.description || ''} onChange={e => setAbout(a=>({...a,description:e.target.value}))} rows={4} /></div>
        <div className="form-row-2">
          <div className="form-group"><label>Office Address</label><input value={about.address || ''} onChange={e => setAbout(a=>({...a,address:e.target.value}))} /></div>
          <div className="form-group"><label>Email</label><input value={about.email || ''} onChange={e => setAbout(a=>({...a,email:e.target.value}))} /></div>
        </div>
        <div className="form-group"><label>Working Hours</label><input value={about.workingHours || ''} onChange={e => setAbout(a=>({...a,workingHours:e.target.value}))} /></div>
        <div className="about-admin-stats">
          <h4>Stats Section</h4>
          <div className="stats-edit-grid">
            {(about.stats || []).map((s, i) => (
              <div key={i} className="stat-edit">
                <div className="form-group">
                  <label>Value</label>
                  <input value={s.value} onChange={e => {
                    const stats = [...about.stats]; stats[i] = {...s, value: e.target.value};
                    setAbout(a=>({...a, stats}));
                  }} placeholder="e.g. 500+" />
                </div>
                <div className="form-group">
                  <label>Label</label>
                  <input value={s.label} onChange={e => {
                    const stats = [...about.stats]; stats[i] = {...s, label: e.target.value};
                    setAbout(a=>({...a, stats}));
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="btn-primary" onClick={save} disabled={loading}>
          {loading ? 'Saving...' : '💾 Save All Changes'}
        </button>
      </div>
    </div>
  );
}