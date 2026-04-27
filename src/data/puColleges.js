const PU_DIRECTORY_GROUPS = [
  {
    name: 'Arts, Social Sciences & Humanities',
    units: [
      'Centre for Human Rights & Duties (UIEASS)',
      'Centre for Police Administration (UIEASS)',
      'Centre for Social Work (UIEASS)',
      'Department cum Centre for Women’s Studies & Development',
      'Department of Ancient Indian History, Culture & Archaeology',
      'Department of Defence & National Security Studies',
      'Department of Economics',
      'Department of Gandhian & Peace Studies',
      'Department of Geography',
      'Department of Guru Nanak Sikh Studies',
      'Department of History',
      'Department of Philosophy',
      'Department of Political Science',
      'Department of Psychology',
      'Department of Public Administration',
      'Department of Sociology',
      'Institute of Social Science Education & Research',
    ],
  },
  {
    name: 'Media, Communication & Management',
    units: [
      'School of Communication Studies',
      'University Business School',
      'University Business School - Ludhiana',
      'University Institute of Applied Management Sciences',
      'University Institute of Hotel & Tourism Management',
    ],
  },
  {
    name: 'Design, Fine Arts & Performing Arts',
    units: [
      'Department of Art History & Visual Arts',
      'Department of Indian Theatre',
      'Department of Music',
    ],
  },
  {
    name: 'Education & Physical Education',
    units: [
      'Department of Community Education & Disability Studies',
      'Department of Education',
      'Department of Life Long Learning & Extension',
      'Department of Physical Education',
      'Institute of Educational Technology & Vocational Education',
    ],
  },
  {
    name: 'Engineering & Technology',
    units: [
      'Dr. S.S. Bhatnagar University Institute of Chemical Engineering & Technology',
      'University Institute of Engineering & Technology (UIET)',
      'Sophisticated Analytical Instrumentation Facility (SAIF, CIL & UCIM)',
    ],
  },
  {
    name: 'Languages & Literature',
    units: [
      'Department of Chinese & Tibetan Languages',
      'Department of English & Cultural Studies',
      'Department of French & Francophone Studies',
      'Department of German',
      'Department of Hindi',
      'Department of Punjabi',
      'Department of Russian',
      'Department of Sanskrit',
      'Department of Urdu',
      'Vishveshvaranand Institute of Sanskrit & Indological Studies',
      'Bhai Vir Singh Chair',
      'Dayanand Chair for Vedic Studies',
      'Guru Ravidas Chair of Sant Sahitya Studies',
      'Sheikh Baba Farid Chair',
    ],
  },
  {
    name: 'Law',
    units: [
      'Department of Laws',
      'University Institute of Legal Studies',
      'University Institute of Laws - Ludhiana',
    ],
  },
  {
    name: 'Medical & Health Sciences',
    units: [
      'Dr. Harvansh Singh Judge Institute of Dental Sciences & Hospital',
    ],
  },
  {
    name: 'Pharmaceutical Sciences',
    units: [
      'University Institute of Pharmaceutical Sciences',
    ],
  },
  {
    name: 'Science & Technology',
    units: [
      'Centre for Medical Physics',
      'Centre for Nanoscience & Nanotechnology',
      'Centre for Nuclear Medicine',
      'Centre for Public Health',
      'Centre for Stem Cell & Tissue Engineering',
      'Centre for Systems Biology & Bioinformatics',
      'National Centre for Human Genome Studies & Research',
      'Anthropology',
      'Biochemistry',
      'Biophysics',
      'Biotechnology',
      'Botany',
      'Chemistry',
      'Computer Science & Applications',
      'Environment Studies',
      'Forensic Science',
      'Geology',
      'Mathematics',
      'Microbial Biotechnology',
      'Microbiology',
      'Physics',
      'Statistics',
      'Zoology',
    ],
  },
  {
    name: 'Multi-Faculty & Distance Learning',
    units: [
      'Centre for Distance & Online Education',
      'Department of Evening Studies',
    ],
  },
  {
    name: 'Fashion & Vocational',
    units: [
      'University Institute of Fashion Technology & Vocational Development',
    ],
  },
  {
    name: 'Regional Centres',
    units: [
      'P.U. Regional Centre - Ludhiana',
      'P.U. Regional Centre - Muktsar',
      'P.U. Rural Centre - Kauni',
      'P.U. Swami Sarvanand Giri Regional Centre',
    ],
  },
  {
    name: 'Research, Innovation & Special Centres',
    units: [
      'BioNEST',
      'DST - Centre for Policy Research',
      'DST Inspire Internship Program Centre',
      'E-YUVA BioNEST',
      'Centre for Study of Mid-West & Central Asia',
      'Centre for Study of Geopolitics',
      'Centre for Study of Social Inclusion',
    ],
  },
  {
    name: 'Facilities & Administrative Units',
    units: [
      'A.C. Joshi Library',
      'Central Animal House',
      'Central Placement Cell',
      'Centre for IAS & Competitive Exams',
      'Centre for Skill Development & Entrepreneurship',
      'Directorate of Sports',
      'Dr. A.P.J. Abdul Kalam Computer Centre',
      'Energy Research Centre',
      'Human Resource Development Centre',
      'Internal Quality Assurance Cell',
      'Population Research Centre',
      'Publication Bureau',
      'Research & Development Cell',
      'RTI Cell',
      'SC/ST Cell',
      'Vigilance Cell',
      'Anti-Discrimination Cell for Transgender Students',
      'Community Radio - Jyotirgamaya (91.2 MHz)',
    ],
  },
];

function slugify(value) {
  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 36);
}

export const PU_COLLEGES = PU_DIRECTORY_GROUPS.reduce((acc, group, index) => {
  const collegeId = `COL-${String(index + 1).padStart(3, '0')}`;
  acc[collegeId] = {
    id: collegeId,
    name: group.name,
    departments: group.units.map((unit, unitIndex) => ({
      id: `DEPT-${String(index + 1).padStart(3, '0')}-${String(unitIndex + 1).padStart(3, '0')}-${slugify(unit)}`,
      name: unit,
    })),
  };
  return acc;
}, {});

