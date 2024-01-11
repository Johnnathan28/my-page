import "./style.css";
import cvEN from "../../assets/cv-en";
import cvPTBR from "../../assets/cv-ptbr";
import perfilImage from "../../assets/me.jpg";
import T from "../../modules/translator";

const pageName = "curriculum-vitae";
const curriculum = {
  "en-us": cvEN,
  "pt-br": cvPTBR
};

T.addPage(pageName, "en-us", {
  "about": "About",
  "languages": "Languages",
  "education": "Education",
  "pastJobs": "Past jobs",
  "technologies": "technologies",
  "projects": "projects",
  "level": "level",
  "useInProjects": "Use in projects",
  "from": "From",
  "to": "to"
});

T.addPage(pageName, "pt-br", {
  "about": "Sobre",
  "languages": "Línguas",
  "education": "Educação",
  "pastJobs": "Trabalhos",
  "technologies": "Tecnologias",
  "projects": "Projetos",
  "level": "Nível",
  "useInProjects": "Uso em projetos",
  "from": "Desde",
  "to": "até"
});

function getStringDate(datestring) {
  if (!datestring) {
    return "";
  }
  let date = new Date(datestring);
  return date.toLocaleDateString('en-us', {
    day: "numeric", year: "numeric", month: "short"
  });
}

function Header({resume}) {
  return (
    <div className="Header">
      <div className="img-box">
	<img className="img-src" src={perfilImage} alt="me"/>
      </div>
      <div className="info">
	<div className="basic">
	  <h1>{resume.name}</h1>
	  <p>{resume.occupation}</p>
	</div>
	<div className="contact">
	  <p>{resume.contact.email}</p>
	</div>
      </div>
    </div>
  );
}

function Tags({tags}) {
  return (
    <div className="Tags">
      {tags.length > 0 &&
	  tags.map((t, i) => <span key={i} className="Tag">{t}</span>)}
    </div>
  );
}

function Experience({xp}) {
  const {err, t} = T.getPage(pageName);
  if (err) {
    console.error(err);
  }

  let stringDateFrom = getStringDate(xp.from);
  let stringDateTo = getStringDate(xp.to);

  return (
    <div className="Experience">
      <span className="bold-text">{xp.name}<br/></span>
      {xp.description !== "" &&
	<span className="gray-text">{xp.description}<br/></span>}
      {stringDateFrom !== "" &&
	<span className="gray-text">{t("from")} {stringDateFrom}</span>}
      <span> </span>
      {stringDateTo !== "" &&
	<span className="gray-text"> {t("to")} {stringDateTo}</span>}
      <Tags tags={xp.tags}/>
    </div>
  );
}

function Experiences({name, title, experiences}) {
  title = title || name;
  let className = name.replaceAll(" ", "_");
  return (
    <div className={className}>
      <h3>{title}</h3>
      {experiences.map((e, i) => <Experience key={i} xp={e}/>)}
    </div>
  );
}

function Skill({skill}) {
  return (
    <div>
      {skill.fontIcon &&
	<i className={skill.fontIcon + " icon"}></i>}
      <span>{skill.name} - {skill.level}</span>
    </div>
  );
}

function Technology({technology, projects}) {
  const {err, t} = T.getPage(pageName);
  if (err) {
    console.error(err);
  }

  let useCount = 0;
  let projectsCount = projects.length;
  let nameNormalized = technology.name.toUpperCase();

  for (let project of projects) {
    let tags = project.tags.map(s => s.toUpperCase());
    if (tags.includes(nameNormalized)) {
      useCount++;
    }
  }

  return (
    <div className="Technology">
      <div className="icon-name">
	{technology.fontIcon && <i className={technology.fontIcon + " icon"}></i>}
	<span>{technology.name}</span>
      </div>
      <div>
	<span>{t("level")}: {technology.level.toString()}</span><br/>
	<span>{t("useInProjects")}: {useCount}&#47;{projectsCount}</span>
      </div>
    </div>
  );
}

function Technologies({resume}) {
  const {err, t} = T.getPage(pageName, "");
  if (err) {
    console.error(err);
  }
  return (
    <div className="Technologies">
      <h3>{t("technologies")}</h3>
      <div className="grid">
	{resume.technologies.map((e, i) =>
	  <Technology key={i} technology={e} projects={resume.projects}/>)}
      </div>
    </div>
  );
}
 
function Project({project}) {
    return (
      <div className="Project">
	<label className="bold-text">{project.name}</label><br/>
	<a className="link" href={project.link}>{project.link}</a>
	<p>{project.about}</p>
	<Tags tags={project.tags}/>
      </div>
    );
}

function Projects({src}) {
  const {err, t} = T.getPage(pageName);
  if (err) {
    console.error(err);
  }
  return (
    <div className="Projects">
      <h3>{t("projects")}</h3>
      <div className="grid">
	{src.map((e, i) => <Project key={i} project={e}/>)}
      </div>
    </div>
  );
}

function CurriculumVitae() {
  const urlParams = new URLSearchParams(window.location.search);

  let lang = urlParams.get("lang");
  let langStatus = T.setLang(lang);
  if (langStatus.err) {
    console.error(langStatus.err);
    lang = "en-us";
    langStatus = T.setLang(lang);
    if (langStatus.err) {
      console.error(langStatus.err);
    }
  }

  const {err, t} = T.getPage(pageName);
  if (err) {
    console.error(err);
  }

  const cv = curriculum[lang];

  return (
    <div className="Curriculum-vitae">
      <Header resume={cv}/>
      <hr/>
      <div className="About">
	<div>
	  <h3>{t("about")}</h3>
	  <p>{cv.about}</p>
	</div>
	<div>
	  <h3>{t("languages")}</h3>
	  {cv.languages.map((e, i) => <Skill key={i} skill={e}/>)}
	</div>
      </div>
      <hr/>
      <Experiences name="Education" title={t("education")} experiences={cv.education}/>
      <hr/>
      <Experiences name="Past Jobs" title={t("pastJobs")} experiences={cv.pastJobs}/>
      <hr/>
      <Technologies resume={cv}/>
      <hr/>
      <Projects src={cv.projects}/>
    </div>
  );
}

export default CurriculumVitae;
