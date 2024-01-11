/**
 * TODO: doc.
 */
class Translator {
  constructor() {
    this.pages = [];
    this.currentLang = undefined;
  }

  setLang(lang) {
    if (this.pages[lang] === undefined) {
      return {err: `language (${lang}) translation not found`};
    }
    this.currentLang = lang;
    return {err: ""};
  }

  getLang() {
    return this.currentLang;
  }

  getPage(name) {
    if (this.pages[this.currentLang] === undefined) {
      return {err: `page (${name}) not include in language (${this.currentLang})`, t: () => ""};
    }
    if (this.pages[this.currentLang][name] === undefined) {
      return {err: `missing page (f{name})`, t: () => ""};
    }
    return {
      err: "",
      t: (word) => this.pages[this.currentLang][name][word] || ""
    };
  }

  addPage(name, lang, translation) {
    if (this.pages[lang] === undefined) {
      this.pages[lang] = {};
    }
    this.pages[lang][name] = translation;
  }
}

export default new Translator();
