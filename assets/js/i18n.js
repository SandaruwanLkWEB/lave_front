// Minimal i18n (Sinhala default + English toggle)
const I18N = {
  si: {
    'brand.name': 'Leave System',
    'menu.dashboard': 'Dashboard',
    'menu.request': 'Leave ඉල්ලීම',
    'menu.myleaves': 'මගේ Leave',
    'menu.dept_requests': 'දෙපාර්තමේන්තු ඉල්ලීම්',
    'menu.hod_requests': 'HOD ඉල්ලීම්',
    'menu.final_approvals': 'අවසන් අනුමැති',
    'menu.unregistered': 'Unregistered',
    'menu.appeals': 'අභියාචනා',
    'menu.reports': 'Reports',
    'menu.security': 'Security OUT/IN',

    'common.run': 'Run',
    'common.download_csv': 'CSV බාගන්න',
    'common.download_xlsx': 'XLSX බාගන්න',
    'common.apply': 'Apply',
    'common.reset': 'Reset',
    'common.loading': 'Loading…',

    'reports.title': 'Reports',
    'reports.subtitle': 'Daily / Monthly / Yearly (HR / ADMIN).',
    'reports.type': 'Type',
    'reports.date': 'Date',
    'reports.month': 'Month',
    'reports.year': 'Year',
    'reports.department': 'Department',
    'reports.employee': 'Emp No / Name',
    'reports.status': 'Status',
    'reports.unregistered': 'Unregistered පමණක්',
    'reports.all': 'All',

    // Status labels
    'status.PENDING_HOD': 'HOD අනුමැතිය බලාපොරොත්තු වෙයි',
    'status.PENDING_ADMIN': 'Admin අනුමැතිය බලාපොරොත්තු වෙයි',
    'status.PENDING_HR': 'HR අනුමැතිය බලාපොරොත්තු වෙයි',
    'status.REJECTED_HOD': 'HOD ප්‍රතික්ෂේප',
    'status.REJECTED_ADMIN': 'Admin ප්‍රතික්ෂේප',
    'status.FINAL_APPROVED': 'අවසන් අනුමතයි',
    'status.FINAL_REJECTED': 'අවසන් ප්‍රතික්ෂේපයි',
    'status.APPEAL_PENDING_HR': 'HR අභියාචනය බලාපොරොත්තු වෙයි',
    'status.APPEALED': 'අභියාචනය කළා',
    'status.AUTO_CLOSED': 'Auto Closed'
  },
  en: {
    'brand.name': 'Leave System',
    'menu.dashboard': 'Dashboard',
    'menu.request': 'Request Leave',
    'menu.myleaves': 'My Leaves',
    'menu.dept_requests': 'Dept Requests',
    'menu.hod_requests': 'HOD Requests',
    'menu.final_approvals': 'Final Approvals',
    'menu.unregistered': 'Unregistered',
    'menu.appeals': 'Appeals',
    'menu.reports': 'Reports',
    'menu.security': 'Security OUT/IN',

    'common.run': 'Run',
    'common.download_csv': 'Download CSV',
    'common.download_xlsx': 'Download XLSX',
    'common.apply': 'Apply',
    'common.reset': 'Reset',
    'common.loading': 'Loading…',

    'reports.title': 'Reports',
    'reports.subtitle': 'Daily / Monthly / Yearly (HR / ADMIN).',
    'reports.type': 'Type',
    'reports.date': 'Date',
    'reports.month': 'Month',
    'reports.year': 'Year',
    'reports.department': 'Department',
    'reports.employee': 'Emp No / Name',
    'reports.status': 'Status',
    'reports.unregistered': 'Only Unregistered',
    'reports.all': 'All',

    'status.PENDING_HOD': 'Pending HOD',
    'status.PENDING_ADMIN': 'Pending Admin',
    'status.PENDING_HR': 'Pending HR',
    'status.REJECTED_HOD': 'Rejected by HOD',
    'status.REJECTED_ADMIN': 'Rejected by Admin',
    'status.FINAL_APPROVED': 'Final Approved',
    'status.FINAL_REJECTED': 'Final Rejected',
    'status.APPEAL_PENDING_HR': 'Appeal Pending HR',
    'status.APPEALED': 'Appealed',
    'status.AUTO_CLOSED': 'Auto Closed'
  }
};

function getLang(){
  return localStorage.getItem('lang') || 'si';
}

function setLang(lang){
  localStorage.setItem('lang', lang);
  location.reload();
}

function t(key){
  const lang = getLang();
  const dict = I18N[lang] || I18N.si;
  return dict[key] || (I18N.en && I18N.en[key]) || key;
}

function formatStatus(status){
  const s = String(status || '').toUpperCase();
  return t('status.' + s) || s;
}

function statusBadgeClass(status){
  const s = String(status || '').toUpperCase();
  if (s.includes('APPROVED')) return 'bg-approved';
  if (s.includes('REJECT')) return 'bg-rejected';
  if (s.includes('APPEAL')) return 'bg-appealed';
  if (s.includes('PENDING')) return 'bg-pending';
  return 'text-bg-secondary';
}
