import {
  ResumeLayout,
  ResumeHeader,
  ResumeAbout,
  ResumeCourses,
  ResumeWorks,
  ResumeProjects,
  ResumeSoftSkills,
  ResumeTechnologies,
  ResumeContact,
} from 'react-resume-kit'
import {content} from '@/content/resumeData'

export default function Resume({language}: {language: 'en' | 'es'}) {
  return (
    <ResumeLayout
      resumeContent={content}
      initialLanguage={language}
      enableLanguageSwitch={false}
      enablePdfDownload={true}
    >
      <ResumeHeader />
      <ResumeAbout />
      <ResumeWorks />
      <ResumeCourses />
      <ResumeProjects />
      <ResumeTechnologies />
      <ResumeSoftSkills />
      <ResumeContact />
    </ResumeLayout>
  )
}
