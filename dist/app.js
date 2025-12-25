"use strict";
(() => {
  // js/app.ts
  var SUPPORTED_VERSION = 19;
  var DaylioScribe = class {
    constructor() {
      // Data
      this.data = null;
      this.entries = [];
      this.filteredEntries = [];
      this.currentEntryIndex = null;
      this.moods = {};
      this.assetMap = null;
      // Quill editor
      this.quill = null;
      this.isUpdating = false;
      this.hasUnsavedChanges = false;
      this.savedSelection = null;
      // Original entry states for revert (keyed by entry index)
      this.originalEntryStates = /* @__PURE__ */ new Map();
      // Calendar state
      this.calendarDate = /* @__PURE__ */ new Date();
      this.selectedCalendarDate = null;
      // Photo gallery state
      this.currentEntryPhotos = [];
      this.currentPhotoIndex = 0;
      this.lightboxTrigger = null;
      // Virtual scrolling state
      this.itemHeight = 73;
      this.bufferSize = 5;
      this.lastVisibleStart = -1;
      this.lastVisibleEnd = -1;
      this.scrollRAF = null;
      // Default mood labels
      this.defaultMoodLabels = {
        1: "great",
        2: "good",
        3: "meh",
        4: "bad",
        5: "awful"
      };
      // ZIP storage
      this.originalZip = null;
      this.assets = {};
      this.handleLightboxKeydown = (e) => {
        if (e.key === "Tab") {
          const focusableEls = this.photoLightbox.querySelectorAll(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          const firstEl = focusableEls[0];
          const lastEl = focusableEls[focusableEls.length - 1];
          if (e.shiftKey && document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          } else if (!e.shiftKey && document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      };
      this.initTheme();
      this.initElements();
      this.initQuill();
      this.bindEvents();
      this.initVirtualScroll();
    }
    initTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
    }
    toggleTheme() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      let newTheme;
      if (currentTheme === "light") {
        newTheme = "dark";
      } else if (currentTheme === "dark") {
        newTheme = "light";
      } else {
        newTheme = systemPrefersDark ? "light" : "dark";
      }
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    }
    initElements() {
      this.toastContainer = document.getElementById("toastContainer");
      this.dropzone = document.getElementById("dropzone");
      this.fileInput = document.getElementById("fileInput");
      this.app = document.getElementById("app");
      this.entryCount = document.getElementById("entryCount");
      this.notesCount = document.getElementById("notesCount");
      this.backupVersion = document.getElementById("backupVersion");
      this.filterNotes = document.getElementById("filterNotes");
      this.searchInput = document.getElementById("searchInput");
      this.dateRangeSelect = document.getElementById("dateRangeSelect");
      this.customDateRange = document.getElementById("customDateRange");
      this.dateFrom = document.getElementById("dateFrom");
      this.dateTo = document.getElementById("dateTo");
      this.entriesList = document.getElementById("entriesList");
      this.entriesPanel = this.entriesList.parentElement;
      this.miniCalendar = document.getElementById("miniCalendar");
      this.calendarTitle = document.getElementById("calendarTitle");
      this.calendarGrid = document.getElementById("calendarGrid");
      this.prevMonthBtn = document.getElementById("prevMonth");
      this.nextMonthBtn = document.getElementById("nextMonth");
      this.saveBtn = document.getElementById("saveBtn");
      this.exportCsvBtn = document.getElementById("exportCsvBtn");
      this.editorPlaceholder = document.getElementById("editorPlaceholder");
      this.editor = document.getElementById("editor");
      this.editorDate = document.getElementById("editorDate");
      this.editorMood = document.getElementById("editorMood");
      this.noteTitleInput = document.getElementById("noteTitleInput");
      this.revertBtn = document.getElementById("revertBtn");
      this.photoSection = document.getElementById("photoSection");
      this.photoCount = document.getElementById("photoCount");
      this.photoThumbnails = document.getElementById("photoThumbnails");
      this.photoLightbox = document.getElementById("photoLightbox");
      this.lightboxImage = document.getElementById("lightboxImage");
      this.lightboxCounter = document.getElementById("lightboxCounter");
      this.lightboxClose = document.getElementById("lightboxClose");
      this.lightboxPrev = document.getElementById("lightboxPrev");
      this.lightboxNext = document.getElementById("lightboxNext");
      this.themeToggle = document.getElementById("themeToggle");
    }
    initQuill() {
      this.quill = new Quill("#noteEditor", {
        theme: "snow",
        placeholder: "Write your note here...",
        modules: {
          toolbar: {
            container: [
              ["undo", "redo"],
              ["bold", "italic", "underline", "strike"],
              [{ "list": "ordered" }, { "list": "bullet" }],
              ["emoji"]
            ],
            handlers: {
              "emoji": () => this.toggleEmojiPicker(),
              "undo": () => this.quill.history.undo(),
              "redo": () => this.quill.history.redo()
            }
          },
          keyboard: {
            bindings: {
              bold: {
                key: "B",
                shortKey: true,
                handler: function(_range, context) {
                  this.quill.format("bold", !context.format.bold);
                }
              },
              italic: {
                key: "I",
                shortKey: true,
                handler: function(_range, context) {
                  this.quill.format("italic", !context.format.italic);
                }
              },
              underline: {
                key: "U",
                shortKey: true,
                handler: function(_range, context) {
                  this.quill.format("underline", !context.format.underline);
                }
              }
            }
          }
        }
      });
      this.quill.on("text-change", (_delta, _oldDelta, source) => {
        if (!this.isUpdating && source === "user") {
          this.updateCurrentEntry();
        }
      });
      this.initEmojiPicker();
    }
    initEmojiPicker() {
      this.emojiPickerPopup = document.getElementById("emojiPickerPopup");
      this.emojiPicker = document.querySelector("emoji-picker");
      setTimeout(() => {
        const emojiBtn = document.querySelector(".ql-emoji");
        if (emojiBtn) {
          emojiBtn.setAttribute("aria-label", "Insert emoji");
          emojiBtn.setAttribute("title", "Insert emoji");
        }
        const undoBtn = document.querySelector(".ql-undo");
        if (undoBtn) {
          undoBtn.setAttribute("aria-label", "Undo");
          undoBtn.setAttribute("title", "Undo (Ctrl+Z)");
        }
        const redoBtn = document.querySelector(".ql-redo");
        if (redoBtn) {
          redoBtn.setAttribute("aria-label", "Redo");
          redoBtn.setAttribute("title", "Redo (Ctrl+Shift+Z)");
        }
      }, 100);
      this.emojiPicker.addEventListener("emoji-click", (event) => {
        const emoji = event.detail.unicode;
        this.insertEmoji(emoji);
        this.hideEmojiPicker();
      });
      document.addEventListener("click", (event) => {
        if (!this.emojiPickerPopup.classList.contains("hidden")) {
          const target = event.target;
          const isClickInside = this.emojiPickerPopup.contains(target) || target.closest(".ql-emoji");
          if (!isClickInside) {
            this.hideEmojiPicker();
          }
        }
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !this.emojiPickerPopup.classList.contains("hidden")) {
          this.hideEmojiPicker();
          const emojiBtn = document.querySelector(".ql-emoji");
          emojiBtn?.focus();
        }
      });
    }
    toggleEmojiPicker() {
      if (this.emojiPickerPopup.classList.contains("hidden")) {
        this.showEmojiPicker();
      } else {
        this.hideEmojiPicker();
      }
    }
    showEmojiPicker() {
      const emojiButton = document.querySelector(".ql-emoji");
      const rect = emojiButton.getBoundingClientRect();
      this.emojiPickerPopup.style.top = rect.bottom + 5 + "px";
      this.emojiPickerPopup.style.left = rect.left + "px";
      const pickerWidth = 350;
      if (rect.left + pickerWidth > window.innerWidth) {
        this.emojiPickerPopup.style.left = window.innerWidth - pickerWidth - 10 + "px";
      }
      this.emojiPickerPopup.classList.remove("hidden");
      this.savedSelection = this.quill.getSelection();
    }
    hideEmojiPicker() {
      this.emojiPickerPopup.classList.add("hidden");
    }
    insertEmoji(emoji) {
      const range = this.savedSelection || { index: this.quill.getLength() - 1 };
      this.quill.insertText(range.index, emoji, "user");
      this.quill.setSelection(range.index + emoji.length);
    }
    bindEvents() {
      this.themeToggle.addEventListener("click", () => this.toggleTheme());
      this.dropzone.addEventListener("click", () => this.fileInput.click());
      this.fileInput.addEventListener("change", (e) => {
        const target = e.target;
        if (target.files?.[0]) this.handleFile(target.files[0]);
      });
      this.dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        this.dropzone.classList.add("dragover");
      });
      this.dropzone.addEventListener("dragleave", () => {
        this.dropzone.classList.remove("dragover");
      });
      this.dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        this.dropzone.classList.remove("dragover");
        const file = e.dataTransfer?.files[0];
        if (file) this.handleFile(file);
      });
      this.filterNotes.addEventListener("change", () => {
        this.renderCalendar();
        this.applyFilters();
      });
      this.searchInput.addEventListener("input", () => this.applyFilters());
      this.saveBtn.addEventListener("click", () => this.saveBackup());
      this.exportCsvBtn.addEventListener("click", () => this.exportCsv());
      this.dateRangeSelect.addEventListener("change", () => {
        if (this.dateRangeSelect.value === "custom") {
          this.customDateRange.classList.remove("hidden");
        } else {
          this.customDateRange.classList.add("hidden");
          this.applyFilters();
        }
      });
      this.dateFrom.addEventListener("change", () => this.applyFilters());
      this.dateTo.addEventListener("change", () => this.applyFilters());
      this.prevMonthBtn.addEventListener("click", () => {
        this.calendarDate.setMonth(this.calendarDate.getMonth() - 1);
        this.renderCalendar();
      });
      this.nextMonthBtn.addEventListener("click", () => {
        this.calendarDate.setMonth(this.calendarDate.getMonth() + 1);
        this.renderCalendar();
      });
      this.lightboxClose.addEventListener("click", () => this.closeLightbox());
      this.lightboxPrev.addEventListener("click", () => this.showPrevPhoto());
      this.lightboxNext.addEventListener("click", () => this.showNextPhoto());
      this.photoLightbox.querySelector(".lightbox-overlay")?.addEventListener("click", () => this.closeLightbox());
      document.addEventListener("keydown", (e) => {
        if (!this.photoLightbox.classList.contains("hidden")) {
          if (e.key === "Escape") this.closeLightbox();
          if (e.key === "ArrowLeft") this.showPrevPhoto();
          if (e.key === "ArrowRight") this.showNextPhoto();
        }
      });
      this.noteTitleInput.addEventListener("input", () => this.updateCurrentEntry());
      this.revertBtn.addEventListener("click", () => this.revertEntry());
      window.addEventListener("beforeunload", (e) => {
        if (this.hasUnsavedChanges) {
          e.preventDefault();
          e.returnValue = "";
          return "";
        }
      });
    }
    async handleFile(file) {
      if (!file || !file.name.endsWith(".daylio")) {
        this.showToast("error", "Invalid File", "Please select a .daylio backup file exported from the Daylio app.");
        return;
      }
      try {
        const dropzoneP = this.dropzone.querySelector("p");
        if (dropzoneP) dropzoneP.textContent = "Loading...";
        this.originalZip = await JSZip.loadAsync(file);
        this.assets = {};
        const assetFiles = Object.keys(this.originalZip.files).filter(
          (name) => name.startsWith("assets/") && !this.originalZip.files[name].dir
        );
        for (const assetPath of assetFiles) {
          this.assets[assetPath] = await this.originalZip.files[assetPath].async("uint8array");
        }
        const backupFile = this.originalZip.file("backup.daylio");
        if (!backupFile) {
          throw new Error("backup.daylio not found in the archive");
        }
        const base64Content = await backupFile.async("string");
        const jsonString = this.base64DecodeUtf8(base64Content.trim());
        this.data = JSON.parse(jsonString);
        this.validateBackupStructure();
        if (!this.checkVersion()) {
          if (dropzoneP) dropzoneP.textContent = "Drop your .daylio backup file here";
          return;
        }
        this.entries = this.data.dayEntries || [];
        this.storeOriginalEntryStates();
        this.buildMoodLabels();
        this.showApp();
      } catch (err) {
        this.showToast("error", "Failed to Load Backup", err.message);
        const dropzoneP = this.dropzone.querySelector("p");
        if (dropzoneP) dropzoneP.textContent = "Drop your .daylio backup file here";
      }
    }
    checkVersion() {
      const backupVersion = this.data?.version;
      if (backupVersion === void 0) {
        console.warn("Backup has no version field - proceeding anyway");
        return true;
      }
      if (backupVersion > SUPPORTED_VERSION) {
        const proceed = confirm(
          `Warning: This backup is from a newer Daylio version (v${backupVersion}).

This app was tested with version ${SUPPORTED_VERSION}.

The backup structure may have changed. Editing could cause data loss or corruption.

Do you want to continue anyway?`
        );
        if (!proceed) {
          return false;
        }
        console.warn(`Proceeding with unsupported backup version ${backupVersion} (supported: ${SUPPORTED_VERSION})`);
      }
      return true;
    }
    validateBackupStructure() {
      if (!this.data || typeof this.data !== "object") {
        throw new Error("Invalid backup: not a valid JSON object");
      }
      if (!Array.isArray(this.data.dayEntries)) {
        throw new Error("Invalid backup: missing or invalid dayEntries array");
      }
      if (!Array.isArray(this.data.customMoods)) {
        throw new Error("Invalid backup: missing or invalid customMoods array");
      }
      for (let i = 0; i < Math.min(this.data.dayEntries.length, 5); i++) {
        const entry = this.data.dayEntries[i];
        if (typeof entry.datetime !== "number") {
          throw new Error(`Invalid backup: entry ${i} missing datetime field`);
        }
        if (typeof entry.mood !== "number") {
          throw new Error(`Invalid backup: entry ${i} missing mood field`);
        }
      }
    }
    buildMoodLabels() {
      this.moods = {};
      const customMoods = this.data?.customMoods || [];
      for (const mood of customMoods) {
        let label = mood.custom_name?.trim();
        if (!label) {
          label = this.defaultMoodLabels[mood.predefined_name_id] || `mood ${mood.id}`;
        }
        this.moods[mood.id] = {
          label,
          groupId: mood.mood_group_id
        };
      }
    }
    storeOriginalEntryStates() {
      this.originalEntryStates.clear();
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        this.originalEntryStates.set(i, {
          note: entry.note || "",
          note_title: entry.note_title || ""
        });
      }
    }
    hasAnyChanges() {
      for (let i = 0; i < this.entries.length; i++) {
        const entry = this.entries[i];
        const original = this.originalEntryStates.get(i);
        if (!original) continue;
        if (entry.note !== original.note || entry.note_title !== original.note_title) {
          return true;
        }
      }
      return false;
    }
    getMoodLabel(moodId) {
      return this.moods[moodId]?.label || `mood ${moodId}`;
    }
    getMoodGroupId(moodId) {
      return this.moods[moodId]?.groupId || moodId;
    }
    showApp() {
      this.dropzone.classList.add("hidden");
      this.app.classList.remove("hidden");
      const withNotes = this.entries.filter((e) => e.note && e.note.length > 0).length;
      this.entryCount.textContent = `${this.entries.length} entries`;
      this.notesCount.textContent = `${withNotes} with notes`;
      const version = this.data?.version;
      if (version !== void 0) {
        this.backupVersion.textContent = `v${version}`;
        if (version > SUPPORTED_VERSION) {
          this.backupVersion.classList.add("version-warning");
          this.backupVersion.dataset.tooltip = `Unsupported version (tested up to v${SUPPORTED_VERSION})`;
        } else {
          this.backupVersion.classList.remove("version-warning");
          this.backupVersion.dataset.tooltip = "Backup format version";
        }
      } else {
        this.backupVersion.textContent = "v?";
        this.backupVersion.dataset.tooltip = "Unknown version";
      }
      this.miniCalendar.classList.add("visible");
      this.renderCalendar();
      this.applyFilters();
    }
    applyFilters() {
      let filtered = [...this.entries];
      if (this.filterNotes.checked) {
        filtered = filtered.filter((e) => e.note && e.note.length > 0);
      }
      const dateRange = this.getDateRange();
      if (dateRange) {
        filtered = filtered.filter((e) => {
          const entryDate = e.datetime;
          return entryDate >= dateRange.from && entryDate <= dateRange.to;
        });
      }
      const searchTerm = this.searchInput.value.toLowerCase().trim();
      if (searchTerm) {
        filtered = filtered.filter((e) => {
          const noteText = this.htmlToPlainText(e.note || "").toLowerCase();
          const titleText = (e.note_title || "").toLowerCase();
          return noteText.includes(searchTerm) || titleText.includes(searchTerm);
        });
      }
      filtered.sort((a, b) => b.datetime - a.datetime);
      this.filteredEntries = filtered;
      this.renderEntries();
    }
    getDateRange() {
      const selection = this.dateRangeSelect.value;
      const now = /* @__PURE__ */ new Date();
      let from, to;
      switch (selection) {
        case "all":
          return null;
        case "thisMonth":
          from = new Date(now.getFullYear(), now.getMonth(), 1);
          to = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
          break;
        case "last30":
          from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3);
          to = now;
          break;
        case "last3Months":
          from = new Date(now.getFullYear(), now.getMonth() - 2, 1);
          to = now;
          break;
        case "thisYear":
          from = new Date(now.getFullYear(), 0, 1);
          to = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);
          break;
        case "lastYear":
          from = new Date(now.getFullYear() - 1, 0, 1);
          to = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999);
          break;
        case "custom": {
          const fromVal = this.dateFrom.value;
          const toVal = this.dateTo.value;
          if (!fromVal && !toVal) return null;
          from = fromVal ? /* @__PURE__ */ new Date(fromVal + "T00:00:00") : /* @__PURE__ */ new Date(0);
          to = toVal ? /* @__PURE__ */ new Date(toVal + "T23:59:59.999") : now;
          break;
        }
        default:
          return null;
      }
      return { from: from.getTime(), to: to.getTime() };
    }
    renderCalendar() {
      const year = this.calendarDate.getFullYear();
      const month = this.calendarDate.getMonth();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      this.calendarTitle.textContent = `${monthNames[month]} ${year}`;
      const entriesMap = this.buildEntriesMap();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const totalDays = lastDay.getDate();
      let startDay = firstDay.getDay() - 1;
      if (startDay < 0) startDay = 6;
      const today = /* @__PURE__ */ new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
      this.calendarGrid.innerHTML = "";
      for (let i = 0; i < startDay; i++) {
        const prevMonthDay = new Date(year, month, -startDay + i + 1);
        this.calendarGrid.appendChild(this.createDayCell(prevMonthDay, entriesMap, true));
      }
      for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const isToday = isCurrentMonth && day === today.getDate();
        this.calendarGrid.appendChild(this.createDayCell(date, entriesMap, false, isToday));
      }
      const cellsUsed = startDay + totalDays;
      const cellsNeeded = Math.ceil(cellsUsed / 7) * 7;
      for (let i = 0; i < cellsNeeded - cellsUsed; i++) {
        const nextMonthDay = new Date(year, month + 1, i + 1);
        this.calendarGrid.appendChild(this.createDayCell(nextMonthDay, entriesMap, true));
      }
    }
    createDayCell(date, entriesMap, isOtherMonth, isToday = false) {
      const cell = document.createElement("div");
      cell.className = "calendar-day";
      cell.textContent = String(date.getDate());
      cell.setAttribute("role", "button");
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const fullDate = `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      if (isOtherMonth) {
        cell.classList.add("other-month");
      }
      if (isToday) {
        cell.classList.add("today");
      }
      const isSelected = this.selectedCalendarDate && date.getFullYear() === this.selectedCalendarDate.getFullYear() && date.getMonth() === this.selectedCalendarDate.getMonth() && date.getDate() === this.selectedCalendarDate.getDate();
      if (isSelected) {
        cell.classList.add("selected");
        cell.setAttribute("aria-pressed", "true");
      } else {
        cell.setAttribute("aria-pressed", "false");
      }
      const today = /* @__PURE__ */ new Date();
      today.setHours(0, 0, 0, 0);
      const cellDate = new Date(date);
      cellDate.setHours(0, 0, 0, 0);
      const isFuture = cellDate > today;
      if (isFuture) {
        cell.classList.add("future");
        cell.setAttribute("aria-disabled", "true");
        cell.setAttribute("aria-label", `${fullDate}, future date`);
        return cell;
      }
      cell.setAttribute("tabindex", "0");
      const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const dayEntries = entriesMap[dateKey];
      let ariaLabel = fullDate;
      if (dayEntries && dayEntries.length > 0) {
        cell.classList.add("has-entry");
        const moodGroupId = this.getMoodGroupId(dayEntries[0].mood);
        const moodColors = {
          1: "#4ecca3",
          2: "#7ed957",
          3: "#ffd93d",
          4: "#ff8c42",
          5: "#e94560"
        };
        cell.style.setProperty("--mood-color", moodColors[moodGroupId] || "#a0a0a0");
        ariaLabel += `, ${dayEntries.length} ${dayEntries.length === 1 ? "entry" : "entries"}`;
      }
      if (isToday) ariaLabel += ", today";
      if (isSelected) ariaLabel += ", selected";
      cell.setAttribute("aria-label", ariaLabel);
      cell.addEventListener("click", () => this.handleCalendarDayClick(date));
      cell.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.handleCalendarDayClick(date);
        }
      });
      return cell;
    }
    buildEntriesMap() {
      const map = {};
      const notesOnly = this.filterNotes.checked;
      for (const entry of this.entries) {
        if (notesOnly && (!entry.note || entry.note.length === 0)) {
          continue;
        }
        const date = new Date(entry.datetime);
        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (!map[key]) map[key] = [];
        map[key].push(entry);
      }
      return map;
    }
    handleCalendarDayClick(date) {
      if (this.selectedCalendarDate && date.getFullYear() === this.selectedCalendarDate.getFullYear() && date.getMonth() === this.selectedCalendarDate.getMonth() && date.getDate() === this.selectedCalendarDate.getDate()) {
        this.selectedCalendarDate = null;
        this.dateRangeSelect.value = "all";
        this.customDateRange.classList.add("hidden");
      } else {
        this.selectedCalendarDate = date;
        this.dateRangeSelect.value = "custom";
        this.customDateRange.classList.remove("hidden");
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        this.dateFrom.value = dateStr;
        this.dateTo.value = dateStr;
      }
      this.renderCalendar();
      this.applyFilters();
    }
    initVirtualScroll() {
      this.entriesPanel.addEventListener("scroll", () => this.handleScroll());
      this.entriesList.setAttribute("role", "listbox");
      this.entriesList.setAttribute("aria-label", "Journal entries");
      this.entriesList.addEventListener("keydown", (e) => this.handleEntryListKeydown(e));
    }
    handleEntryListKeydown(e) {
      const focusedEl = document.activeElement;
      if (!focusedEl?.classList.contains("entry-item")) return;
      const currentIndex = parseInt(focusedEl.dataset.virtualIndex || "0");
      let nextIndex = null;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          nextIndex = Math.min(currentIndex + 1, this.filteredEntries.length - 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          nextIndex = Math.max(currentIndex - 1, 0);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          const originalIndex = parseInt(focusedEl.dataset.index || "0");
          this.selectEntry(originalIndex);
          return;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = this.filteredEntries.length - 1;
          break;
        case "Escape":
          e.preventDefault();
          this.deselectEntry();
          return;
        default:
          return;
      }
      if (nextIndex !== null && nextIndex !== currentIndex) {
        this.scrollToEntry(nextIndex);
        requestAnimationFrame(() => {
          const nextEl = this.entriesList.querySelector(`.entry-item[data-virtual-index="${nextIndex}"]`);
          nextEl?.focus();
        });
      }
    }
    scrollToEntry(virtualIndex) {
      const entriesListOffset = this.entriesList.offsetTop;
      const targetScrollTop = entriesListOffset + virtualIndex * this.itemHeight;
      const containerHeight = this.entriesPanel.clientHeight;
      const currentScrollTop = this.entriesPanel.scrollTop;
      if (targetScrollTop < currentScrollTop) {
        this.entriesPanel.scrollTop = targetScrollTop;
      } else if (targetScrollTop + this.itemHeight > currentScrollTop + containerHeight) {
        this.entriesPanel.scrollTop = targetScrollTop - containerHeight + this.itemHeight;
      }
    }
    handleScroll() {
      if (this.scrollRAF) return;
      this.scrollRAF = requestAnimationFrame(() => {
        this.scrollRAF = null;
        this.renderVirtualEntries(false);
      });
    }
    calculateVisibleRange() {
      const panelScrollTop = this.entriesPanel.scrollTop;
      const entriesListOffset = this.entriesList.offsetTop;
      const panelHeight = this.entriesPanel.clientHeight;
      const totalItems = this.filteredEntries.length;
      const effectiveScrollTop = Math.max(0, panelScrollTop - entriesListOffset);
      const visibleTop = Math.max(0, entriesListOffset - panelScrollTop);
      const visibleHeight = panelHeight - visibleTop;
      const visibleStart = Math.floor(effectiveScrollTop / this.itemHeight);
      const visibleCount = Math.ceil(visibleHeight / this.itemHeight);
      const visibleEnd = Math.min(visibleStart + visibleCount, totalItems);
      const bufferedStart = Math.max(0, visibleStart - this.bufferSize);
      const bufferedEnd = Math.min(totalItems, visibleEnd + this.bufferSize);
      return { bufferedStart, bufferedEnd, totalItems };
    }
    renderVirtualEntries(forceRender = true) {
      const { bufferedStart, bufferedEnd, totalItems } = this.calculateVisibleRange();
      if (!forceRender && bufferedStart === this.lastVisibleStart && bufferedEnd === this.lastVisibleEnd) {
        return;
      }
      this.lastVisibleStart = bufferedStart;
      this.lastVisibleEnd = bufferedEnd;
      const searchTerm = this.searchInput.value.trim();
      const fragment = document.createDocumentFragment();
      if (bufferedStart > 0) {
        const topSpacer = document.createElement("div");
        topSpacer.className = "virtual-spacer";
        topSpacer.style.height = `${bufferedStart * this.itemHeight}px`;
        fragment.appendChild(topSpacer);
      }
      for (let i = bufferedStart; i < bufferedEnd; i++) {
        const entry = this.filteredEntries[i];
        const originalIndex = this.entries.indexOf(entry);
        const div = document.createElement("div");
        div.className = "entry-item";
        div.dataset.index = String(originalIndex);
        div.dataset.virtualIndex = String(i);
        div.setAttribute("role", "option");
        div.setAttribute("tabindex", "0");
        const isActive = originalIndex === this.currentEntryIndex;
        if (isActive) {
          div.classList.add("active");
          div.setAttribute("aria-selected", "true");
        } else {
          div.setAttribute("aria-selected", "false");
        }
        const date = this.formatDate(entry);
        const preview = this.getPreview(entry, searchTerm);
        const moodGroupId = this.getMoodGroupId(entry.mood);
        const moodClass = `mood-${moodGroupId}`;
        const moodLabel = this.getMoodLabel(entry.mood);
        const plainPreview = this.htmlToPlainText(entry.note || "").substring(0, 50);
        const ariaLabel = `${date}, ${moodLabel}${plainPreview ? ", " + plainPreview : ""}`;
        div.setAttribute("aria-label", ariaLabel);
        const hasContent = entry.note_title?.trim() || entry.note;
        const hasPhotos = entry.assets && entry.assets.length > 0;
        const photoIcon = hasPhotos ? '<span class="photo-icon" aria-hidden="true">\u{1F4F7}</span>' : "";
        const photoSrText = hasPhotos ? '<span class="sr-only">, has photos</span>' : "";
        div.innerHTML = `
                <div class="entry-header">
                    <span class="entry-date">${date}</span>
                    ${photoIcon}${photoSrText}
                    <span class="mood-badge ${moodClass}">${moodLabel}</span>
                </div>
                <div class="${hasContent ? "entry-preview" : "entry-no-note"}">${preview}</div>
            `;
        div.addEventListener("click", () => this.selectEntry(originalIndex));
        fragment.appendChild(div);
      }
      const remainingItems = totalItems - bufferedEnd;
      if (remainingItems > 0) {
        const bottomSpacer = document.createElement("div");
        bottomSpacer.className = "virtual-spacer";
        bottomSpacer.style.height = `${remainingItems * this.itemHeight}px`;
        fragment.appendChild(bottomSpacer);
      }
      this.entriesList.innerHTML = "";
      this.entriesList.appendChild(fragment);
    }
    renderEntries() {
      this.lastVisibleStart = -1;
      this.lastVisibleEnd = -1;
      this.entriesPanel.scrollTop = 0;
      this.renderVirtualEntries(true);
    }
    formatDate(entry) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return `${months[entry.month]} ${entry.day}, ${entry.year}`;
    }
    getPreview(entry, searchTerm = "") {
      const hasNote = entry.note && entry.note.length > 0;
      const hasTitle = entry.note_title && entry.note_title.trim();
      if (!hasTitle && !hasNote) {
        return this.escapeHtml("No note");
      }
      if (searchTerm && hasNote) {
        const plain = this.htmlToPlainText(entry.note);
        const lowerPlain = plain.toLowerCase();
        const lowerTerm = searchTerm.toLowerCase();
        const matchIndex = lowerPlain.indexOf(lowerTerm);
        if (matchIndex !== -1) {
          const snippetLength = 60;
          const termLength = searchTerm.length;
          let start = Math.max(0, matchIndex - Math.floor((snippetLength - termLength) / 2));
          let end = Math.min(plain.length, start + snippetLength);
          if (end === plain.length) {
            start = Math.max(0, end - snippetLength);
          }
          let snippet = plain.substring(start, end);
          if (start > 0) snippet = "..." + snippet;
          if (end < plain.length) snippet = snippet + "...";
          return this.highlightText(snippet, searchTerm);
        }
      }
      let text;
      if (hasTitle) {
        text = entry.note_title.trim();
      } else {
        const plain = this.htmlToPlainText(entry.note);
        text = plain.length > 60 ? plain.substring(0, 60) + "..." : plain;
      }
      return this.highlightText(text, searchTerm);
    }
    selectEntry(index) {
      this.currentEntryIndex = index;
      const entry = this.entries[index];
      this.editorPlaceholder.classList.add("hidden");
      this.editor.classList.remove("hidden");
      this.editorDate.textContent = this.formatDate(entry);
      this.editorMood.textContent = this.getMoodLabel(entry.mood);
      this.editorMood.className = `mood-badge mood-${this.getMoodGroupId(entry.mood)}`;
      this.noteTitleInput.value = entry.note_title || "";
      const cleanHtml = this.daylioToQuillHtml(entry.note || "");
      const delta = this.quill.clipboard.convert({ html: cleanHtml });
      this.quill.setContents(delta, "silent");
      this.quill.history.clear();
      this.revertBtn.classList.add("hidden");
      document.querySelectorAll(".entry-item").forEach((el) => {
        const htmlEl = el;
        el.classList.toggle("active", parseInt(htmlEl.dataset.index || "") === index);
        htmlEl.setAttribute("aria-selected", parseInt(htmlEl.dataset.index || "") === index ? "true" : "false");
      });
      this.announceToScreenReader(`Selected entry: ${this.formatDate(entry)}, ${this.getMoodLabel(entry.mood)}`);
      this.renderPhotos(entry);
    }
    deselectEntry() {
      this.currentEntryIndex = -1;
      this.editor.classList.add("hidden");
      this.editorPlaceholder.classList.remove("hidden");
      document.querySelectorAll(".entry-item").forEach((el) => {
        el.classList.remove("active");
        el.setAttribute("aria-selected", "false");
      });
      this.announceToScreenReader("Entry deselected");
    }
    announceToScreenReader(message) {
      let liveRegion = document.getElementById("srAnnouncer");
      if (!liveRegion) {
        liveRegion = document.createElement("div");
        liveRegion.id = "srAnnouncer";
        liveRegion.className = "sr-only";
        liveRegion.setAttribute("aria-live", "polite");
        liveRegion.setAttribute("aria-atomic", "true");
        document.body.appendChild(liveRegion);
      }
      liveRegion.textContent = "";
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    }
    renderPhotos(entry) {
      this.currentEntryPhotos.forEach((url) => URL.revokeObjectURL(url));
      this.photoThumbnails.innerHTML = "";
      this.currentEntryPhotos = [];
      const entryAssetIds = entry.assets || [];
      if (entryAssetIds.length === 0) {
        this.photoSection.classList.add("hidden");
        return;
      }
      if (!this.assetMap) {
        this.assetMap = {};
        (this.data?.assets || []).forEach((asset) => {
          this.assetMap[asset.id] = asset;
        });
      }
      entryAssetIds.forEach((assetId, index) => {
        const asset = this.assetMap[assetId];
        if (!asset) return;
        const createdAt = new Date(asset.createdAt);
        const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1;
        const assetPath = `assets/photos/${year}/${month}/${asset.checksum}`;
        const assetData = this.assets[assetPath];
        if (assetData) {
          const url = this.createImageUrl(assetData);
          this.currentEntryPhotos.push(url);
          const thumb = document.createElement("div");
          thumb.className = "photo-thumbnail";
          thumb.innerHTML = `<img src="${url}" alt="Photo ${index + 1}">`;
          thumb.addEventListener("click", () => this.openLightbox(this.currentEntryPhotos.length - 1));
          this.photoThumbnails.appendChild(thumb);
        }
      });
      if (this.currentEntryPhotos.length > 0) {
        this.photoSection.classList.remove("hidden");
        this.photoCount.textContent = String(this.currentEntryPhotos.length);
      } else {
        this.photoSection.classList.add("hidden");
      }
    }
    createImageUrl(data) {
      let mimeType = "image/jpeg";
      if (data[0] === 137 && data[1] === 80) {
        mimeType = "image/png";
      } else if (data[0] === 71 && data[1] === 73) {
        mimeType = "image/gif";
      }
      const blob = new Blob([data], { type: mimeType });
      return URL.createObjectURL(blob);
    }
    openLightbox(index) {
      if (this.currentEntryPhotos.length === 0) return;
      this.lightboxTrigger = document.activeElement;
      this.currentPhotoIndex = index;
      this.updateLightboxImage();
      this.photoLightbox.classList.remove("hidden");
      document.body.style.overflow = "hidden";
      this.lightboxClose.focus();
      this.photoLightbox.addEventListener("keydown", this.handleLightboxKeydown);
    }
    closeLightbox() {
      this.photoLightbox.classList.add("hidden");
      document.body.style.overflow = "";
      this.photoLightbox.removeEventListener("keydown", this.handleLightboxKeydown);
      if (this.lightboxTrigger) {
        this.lightboxTrigger.focus();
        this.lightboxTrigger = null;
      }
    }
    showPrevPhoto() {
      if (this.currentEntryPhotos.length === 0) return;
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.currentEntryPhotos.length) % this.currentEntryPhotos.length;
      this.updateLightboxImage();
    }
    showNextPhoto() {
      if (this.currentEntryPhotos.length === 0) return;
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.currentEntryPhotos.length;
      this.updateLightboxImage();
    }
    updateLightboxImage() {
      this.lightboxImage.src = this.currentEntryPhotos[this.currentPhotoIndex];
      this.lightboxCounter.textContent = `${this.currentPhotoIndex + 1} / ${this.currentEntryPhotos.length}`;
      const hasMultiple = this.currentEntryPhotos.length > 1;
      this.lightboxPrev.style.display = hasMultiple ? "" : "none";
      this.lightboxNext.style.display = hasMultiple ? "" : "none";
    }
    updateCurrentEntry() {
      if (this.currentEntryIndex === null) return;
      const entry = this.entries[this.currentEntryIndex];
      entry.note_title = this.noteTitleInput.value;
      const quillHtml = this.quill.root.innerHTML;
      entry.note = this.quillToDaylioHtml(quillHtml);
      this.markUnsavedChanges();
      this.updateEntryPreview(this.currentEntryIndex);
      const original = this.originalEntryStates.get(this.currentEntryIndex);
      if (original) {
        const hasChanges = entry.note !== original.note || entry.note_title !== original.note_title;
        this.revertBtn.classList.toggle("hidden", !hasChanges);
      }
    }
    revertEntry() {
      if (this.currentEntryIndex === null) return;
      const original = this.originalEntryStates.get(this.currentEntryIndex);
      if (!original) return;
      const entry = this.entries[this.currentEntryIndex];
      entry.note = original.note;
      entry.note_title = original.note_title;
      this.noteTitleInput.value = entry.note_title;
      const cleanHtml = this.daylioToQuillHtml(entry.note);
      const delta = this.quill.clipboard.convert({ html: cleanHtml });
      this.quill.setContents(delta, "silent");
      this.quill.history.clear();
      this.updateEntryPreview(this.currentEntryIndex);
      this.revertBtn.classList.add("hidden");
      if (!this.hasAnyChanges()) {
        this.clearUnsavedChanges();
      }
      this.showToast("info", "Entry Reverted", "Entry restored to its original state.");
    }
    updateEntryPreview(originalIndex) {
      const entryEl = this.entriesList.querySelector(`.entry-item[data-index="${originalIndex}"]`);
      if (!entryEl) return;
      const entry = this.entries[originalIndex];
      const searchTerm = this.searchInput.value.trim();
      const preview = this.getPreview(entry, searchTerm);
      const hasContent = entry.note_title?.trim() || entry.note;
      const previewEl = entryEl.querySelector(".entry-preview, .entry-no-note");
      if (previewEl) {
        previewEl.className = hasContent ? "entry-preview" : "entry-no-note";
        previewEl.innerHTML = preview;
      }
    }
    markUnsavedChanges() {
      if (!this.hasUnsavedChanges) {
        this.hasUnsavedChanges = true;
        this.saveBtn.classList.add("has-changes");
        this.saveBtn.textContent = "Download Backup *";
      }
    }
    clearUnsavedChanges() {
      this.hasUnsavedChanges = false;
      this.saveBtn.classList.remove("has-changes");
      this.saveBtn.textContent = "Download Backup";
    }
    // HTML conversion methods (duplicated from conversions.ts for class use)
    daylioToQuillHtml(html) {
      if (!html) return "";
      let result = html;
      result = result.replace(/<span[^>]*>/gi, "");
      result = result.replace(/<\/span>/gi, "");
      result = result.replace(/<p[^>]*>/gi, "<p>");
      result = result.replace(/<li([^>]*)>/gi, (_match, attrs) => {
        const dataListMatch = attrs.match(/data-list="([^"]*)"/);
        if (dataListMatch) {
          return `<li data-list="${dataListMatch[1]}">`;
        }
        return "<li>";
      });
      result = result.replace(/<div><br\s*\/?><\/div>/gi, "<p><br></p>");
      result = result.replace(/<div>/gi, "<p>");
      result = result.replace(/<\/div>/gi, "</p>");
      result = result.replace(/\\n/g, "<br>");
      result = result.replace(/<b>/gi, "<strong>");
      result = result.replace(/<\/b>/gi, "</strong>");
      result = result.replace(/<i>/gi, "<em>");
      result = result.replace(/<\/i>/gi, "</em>");
      result = result.replace(/<strike>/gi, "<s>");
      result = result.replace(/<\/strike>/gi, "</s>");
      result = result.replace(/<font[^>]*>/gi, "");
      result = result.replace(/<\/font>/gi, "");
      result = this.convertBrToQuillParagraphs(result);
      result = result.replace(/^(<p><br><\/p>)+/, "");
      result = this.addQuillListAttributes(result);
      return result;
    }
    convertBrToQuillParagraphs(html) {
      if (!html) return html;
      let result = html;
      const BLANK_LINE_PLACEHOLDER = "___BLANK_LINE_PLACEHOLDER___";
      result = result.replace(/<p><br\s*\/?><\/p>/gi, BLANK_LINE_PLACEHOLDER);
      const BR_PLACEHOLDER = "___BR_PLACEHOLDER___";
      result = result.replace(/<br\s*\/?>\s*<br\s*\/?>/gi, `</p><p>${BR_PLACEHOLDER}</p><p>`);
      result = result.replace(/<br\s*\/?>/gi, "</p><p>");
      result = result.replace(new RegExp(BR_PLACEHOLDER, "g"), "<br>");
      result = result.replace(new RegExp(BLANK_LINE_PLACEHOLDER, "g"), "<p><br></p>");
      if (result && !result.startsWith("<")) {
        const firstTagMatch = result.match(/<[^>]+>/);
        if (firstTagMatch) {
          const firstTagIndex = result.indexOf(firstTagMatch[0]);
          const leadingText = result.substring(0, firstTagIndex);
          const rest = result.substring(firstTagIndex);
          if (leadingText.trim()) {
            result = `<p>${leadingText}</p>${rest}`;
          }
        } else {
          result = `<p>${result}</p>`;
        }
      }
      result = result.replace(/<\/p>\s*<\/p>/gi, "</p>");
      result = result.replace(/<p>\s*<p>/gi, "<p>");
      result = result.replace(/<p><\/p>/g, "");
      return result;
    }
    addQuillListAttributes(html) {
      if (!html) return html;
      const parser = new DOMParser();
      const doc = parser.parseFromString("<div>" + html + "</div>", "text/html");
      const container = doc.body.firstChild;
      container.querySelectorAll("ol > li").forEach((li) => {
        if (!li.getAttribute("data-list")) {
          li.setAttribute("data-list", "ordered");
        }
      });
      container.querySelectorAll("ul > li").forEach((li) => {
        if (!li.getAttribute("data-list")) {
          li.setAttribute("data-list", "bullet");
        }
      });
      return container.innerHTML;
    }
    quillToDaylioHtml(html) {
      if (!html || html === "<p><br></p>") return "";
      let result = html;
      result = result.replace(/<span class="ql-ui"[^>]*>.*?<\/span>/gi, "");
      result = result.replace(/<ol>(\s*<li data-list="bullet">)/gi, "<ul><li>");
      result = result.replace(/<li data-list="bullet">/gi, "<li>");
      result = result.replace(/<\/li>(\s*)<\/ol>/gi, (match, space, offset) => {
        const before = result.substring(0, offset);
        if (before.lastIndexOf("<ul>") > before.lastIndexOf("<ol>")) {
          return "</li>" + space + "</ul>";
        }
        return match;
      });
      result = this.convertQuillLists(result);
      result = result.replace(/<strong>/gi, "<b>");
      result = result.replace(/<\/strong>/gi, "</b>");
      result = result.replace(/<em>/gi, "<i>");
      result = result.replace(/<\/em>/gi, "</i>");
      result = result.replace(/<p>/gi, "<div>");
      result = result.replace(/<\/p>/gi, "</div>");
      result = result.replace(/<div><\/div>/gi, "<div><br></div>");
      result = result.replace(/(<div><br><\/div>)+$/, "");
      result = result.trim();
      return result;
    }
    convertQuillLists(html) {
      const parser = new DOMParser();
      const doc = parser.parseFromString("<div>" + html + "</div>", "text/html");
      const container = doc.body.firstChild;
      const ols = container.querySelectorAll("ol");
      ols.forEach((ol) => {
        const items = ol.querySelectorAll("li");
        if (items.length > 0) {
          const firstItem = items[0];
          const listType = firstItem.getAttribute("data-list");
          if (listType === "bullet") {
            const ul = doc.createElement("ul");
            items.forEach((li) => {
              li.removeAttribute("data-list");
              ul.appendChild(li.cloneNode(true));
            });
            ol.parentNode?.replaceChild(ul, ol);
          } else {
            items.forEach((li) => {
              li.setAttribute("data-list", "ordered");
            });
          }
        }
      });
      return container.innerHTML;
    }
    htmlToPlainText(html) {
      if (!html) return "";
      let text = html;
      text = text.replace(/<br\s*\/?>/gi, "\n");
      text = text.replace(/<\/div>\s*<div>/gi, "\n");
      text = text.replace(/<\/(div|p|li)>/gi, "\n");
      text = text.replace(/<li[^>]*>/gi, "\u2022 ");
      text = text.replace(/<[^>]+>/g, "");
      text = text.replace(/&nbsp;/g, " ");
      text = text.replace(/&amp;/g, "&");
      text = text.replace(/&lt;/g, "<");
      text = text.replace(/&gt;/g, ">");
      text = text.replace(/&quot;/g, '"');
      text = text.replace(/&#39;/g, "'");
      text = text.replace(/\\n/g, "\n");
      text = text.replace(/\n{3,}/g, "\n\n");
      text = text.trim();
      return text;
    }
    showToast(type, title, message = "", duration = 5e3) {
      const icons = {
        error: "\u2715",
        success: "\u2713",
        warning: "\u26A0",
        info: "\u2139"
      };
      const toast = document.createElement("div");
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <div class="toast-content">
                <div class="toast-title">${this.escapeHtml(title)}</div>
                ${message ? `<div class="toast-message">${this.escapeHtml(message)}</div>` : ""}
            </div>
            <button class="toast-close" aria-label="Close">\xD7</button>
        `;
      const closeBtn = toast.querySelector(".toast-close");
      closeBtn?.addEventListener("click", () => this.dismissToast(toast));
      this.toastContainer.appendChild(toast);
      if (duration > 0) {
        setTimeout(() => this.dismissToast(toast), duration);
      }
      return toast;
    }
    dismissToast(toast) {
      if (!toast || !toast.parentNode) return;
      toast.classList.add("toast-out");
      toast.addEventListener("animationend", () => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      });
    }
    escapeHtml(text) {
      const div = document.createElement("div");
      div.textContent = text;
      return div.innerHTML;
    }
    highlightText(text, searchTerm) {
      if (!searchTerm || !text) return this.escapeHtml(text);
      const escaped = this.escapeHtml(text);
      const escapedTerm = this.escapeHtml(searchTerm);
      const regexSafe = escapedTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${regexSafe})`, "gi");
      return escaped.replace(regex, "<mark>$1</mark>");
    }
    base64DecodeUtf8(base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return new TextDecoder("utf-8").decode(bytes);
    }
    base64EncodeUtf8(str) {
      const bytes = new TextEncoder().encode(str);
      let binaryString = "";
      for (let i = 0; i < bytes.length; i++) {
        binaryString += String.fromCharCode(bytes[i]);
      }
      return btoa(binaryString);
    }
    async saveBackup() {
      if (!this.data) return;
      try {
        this.data.dayEntries = this.entries;
        const jsonString = JSON.stringify(this.data);
        const base64Content = this.base64EncodeUtf8(jsonString);
        const zip = new JSZip();
        zip.file("backup.daylio", base64Content);
        for (const [path, content] of Object.entries(this.assets)) {
          zip.file(path, content);
        }
        const blob = await zip.generateAsync({
          type: "blob",
          compression: "STORE"
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        a.download = `backup_${dateStr}.daylio`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.clearUnsavedChanges();
        this.showToast("success", "Backup Downloaded", "Your modified backup is ready to import into Daylio.");
      } catch (err) {
        this.showToast("error", "Failed to Save Backup", err.message);
      }
    }
    exportCsv() {
      try {
        if (!this.entries || this.entries.length === 0) {
          this.showToast("warning", "No Entries", "Load a backup file first before exporting.");
          return;
        }
        const headers = ["Date", "Weekday", "Time", "Mood", "Title", "Note"];
        const rows = [headers];
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const sortedEntries = [...this.entries].sort((a2, b) => {
          const dateA = new Date(a2.year, a2.month, a2.day, a2.hour, a2.minute);
          const dateB = new Date(b.year, b.month, b.day, b.hour, b.minute);
          return dateA.getTime() - dateB.getTime();
        });
        for (const entry of sortedEntries) {
          const date = `${entry.year}-${String(entry.month + 1).padStart(2, "0")}-${String(entry.day).padStart(2, "0")}`;
          const weekday = weekdays[new Date(entry.year, entry.month, entry.day).getDay()];
          const time = `${String(entry.hour).padStart(2, "0")}:${String(entry.minute).padStart(2, "0")}`;
          const mood = this.getMoodLabel(entry.mood);
          const title = entry.note_title || "";
          const note = this.htmlToPlainText(entry.note || "");
          rows.push([date, weekday, time, mood, title, note]);
        }
        const csv = rows.map(
          (row) => row.map((cell) => this.escapeCsvField(cell)).join(",")
        ).join("\n");
        const bom = "\uFEFF";
        const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const now = /* @__PURE__ */ new Date();
        const dateStr = `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, "0")}_${String(now.getDate()).padStart(2, "0")}`;
        a.download = `daylio_export_${dateStr}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showToast("success", "CSV Exported", `Exported ${this.entries.length} entries to CSV.`);
      } catch (err) {
        this.showToast("error", "Failed to Export CSV", err.message);
        console.error("CSV export error:", err);
      }
    }
    escapeCsvField(field) {
      if (field === null || field === void 0) return "";
      const str = String(field);
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return '"' + str.replace(/"/g, '""') + '"';
      }
      return str;
    }
  };
  document.addEventListener("DOMContentLoaded", () => {
    new DaylioScribe();
  });
})();
//# sourceMappingURL=app.js.map
