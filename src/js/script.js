(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const header = $(".header");
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const toggle = $(".menu-toggle");
  const navList = $(".nav-list");

  if (toggle && navList) {
    toggle.addEventListener("click", () => {
      const open = navList.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    navList.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        navList.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        navList.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  const yearEl = $("#current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const revealEls = $$(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  const counters = $$("[data-counter]");
  if (counters.length && "IntersectionObserver" in window) {
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.counter, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const duration = 1500;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        el.textContent = value.toLocaleString("pt-BR") + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString("pt-BR") + suffix;
      };
      requestAnimationFrame(step);
    };

    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterIO.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => counterIO.observe(el));
  }

  const moodEmojis = $$(".mood-emoji");
  const moodResult = $("#mood-result");

  const moodMessages = {
    feliz: {
      title: "Que delícia! Pet feliz e saudável",
      tip: "Continue com os passeios e brincadeiras. Que tal premiar com um snack natural do nosso clube?",
    },
    cansado: {
      title: "Hora de descansar",
      tip: "Garanta um cantinho fresco e silencioso. Se persistir, agende um check-up com nosso TeleVet.",
    },
    agitado: {
      title: "Pet com energia de sobra!",
      tip: "Indicamos uma sessão de adestramento ou daycare. Energia gasta é pet feliz no fim do dia.",
    },
    triste: {
      title: "Atenção redobrada",
      tip: "Mudanças de humor podem indicar dor ou estresse. Converse com nosso veterinário, é gratuito no chat.",
    },
    doente: {
      title: "Precisamos ajudar agora",
      tip: "Acione o TeleVet 24h ou venha ao nosso atendimento de urgência. Estamos prontos para cuidar.",
    },
  };

  moodEmojis.forEach((btn) => {
    btn.addEventListener("click", () => {
      const wasSelected = btn.classList.contains("selected");
      moodEmojis.forEach((b) => b.classList.remove("selected"));

      if (wasSelected) {
        if (moodResult) {
          moodResult.classList.remove("show");
          moodResult.innerHTML = "";
        }
        return;
      }

      btn.classList.add("selected");
      const mood = btn.dataset.mood;
      const msg = moodMessages[mood];
      if (moodResult && msg) {
        moodResult.innerHTML = `<strong>${msg.title}</strong><span>${msg.tip}</span>`;
        moodResult.classList.add("show");
      }
    });
  });

  const form = $("#contact-form");

  const validators = {
    nome: (value) => {
      if (!value.trim()) return "Por favor, informe seu nome.";
      if (value.trim().length < 3) return "Nome deve ter pelo menos 3 caracteres.";
      return "";
    },
    email: (value) => {
      const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) return "Informe seu e-mail.";
      if (!rx.test(value)) return "E-mail invalido. Confira o formato.";
      return "";
    },
    telefone: (value) => {
      if (!value.trim()) return "";
      const digits = value.replace(/\D/g, "");
      if (digits.length < 10) return "Telefone deve ter DDD + numero.";
      return "";
    },
    descricao: (value) => {
      if (!value.trim()) return "Conte como podemos ajudar.";
      if (value.trim().length < 10) return "Pelo menos 10 caracteres, por favor.";
      return "";
    },
  };

  const setFieldError = (field, message) => {
    const group = field.closest(".form-group");
    if (!group) return;
    const errorEl = group.querySelector(".form-error");
    if (message) {
      group.classList.add("has-error");
      if (errorEl) errorEl.textContent = message;
    } else {
      group.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    }
  };

  const validateField = (field) => {
    const validator = validators[field.name];
    if (!validator) return true;
    const msg = validator(field.value);
    setFieldError(field, msg);
    return !msg;
  };

  const phoneInput = form?.querySelector('input[name="telefone"]');
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 10) {
        v = v.replace(/(\d{2})(\d{5})(\d{0,4}).*/, "($1) $2-$3");
      } else if (v.length > 6) {
        v = v.replace(/(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
      } else if (v.length > 2) {
        v = v.replace(/(\d{2})(\d{0,5}).*/, "($1) $2");
      } else if (v.length > 0) {
        v = v.replace(/(\d{0,2})/, "($1");
      }
      e.target.value = v;
    });
  }

  if (form) {
    form.querySelectorAll(".form-control").forEach((field) => {
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll(".form-control").forEach((field) => {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        const firstError = form.querySelector(".has-error .form-control");
        if (firstError) firstError.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      setTimeout(() => {
        const success = $("#form-success");
        if (success) {
          success.classList.add("show");
          success.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        setTimeout(() => success?.classList.remove("show"), 6000);
      }, 900);
    });
  }

  const newsletter = $("#newsletter-form");
  if (newsletter) {
    newsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletter.querySelector("input");
      const button = newsletter.querySelector("button");
      if (!input.value.includes("@")) {
        input.style.borderColor = "var(--danger)";
        input.placeholder = "E-mail invalido!";
        setTimeout(() => {
          input.style.borderColor = "";
          input.placeholder = "Seu melhor e-mail";
        }, 2000);
        return;
      }
      const originalText = button.textContent;
      button.textContent = "Inscrito!";
      button.style.background = "var(--success)";
      input.value = "";
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "";
      }, 2500);
    });
  }
})();
