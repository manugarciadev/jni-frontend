"use client";

import Image from "next/image";
import Logo from "@components/Logo";
import config from "@config/config.json";
import React, { useRef, useState } from "react";

const BRAND_GREEN = "#10806B";

const UPLOAD_API_URL = "https://api.bukingmaster.com/kan/template/singleImage";
// TODO: confirmar o caminho real onde os uploads ficam servidos.
// Ajusta este prefixo conforme a pasta estática do teu backend Express
// (ex: app.use('/uploads', express.static('uploads')) → seria "/uploads/")
const UPLOAD_BASE_PATH = "https://api.bukingmaster.com/uploads/";
const WAITLIST_API_URL = "https://api.bukingmaster.com/kan/waitlist/create";

const schoolYears = [
  "1º ano",
  "2º ano",
  "3º ano",
  "4º ano",
  "5º ano",
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
  "10º ano",
  "11º ano",
  "12º ano",
  "Ensino superior",
  "Outro",
];

const serviceOptions = [
  "Coreografia",
  "Cena",
  "Desporto",
  "Louvor",
  "Lazer",
  "Evangelismo",
  "Logística",
  "Oração",
  "TI"
];

const RequiredMark = () => <span className="text-red-500">*</span>;

const WaitlistForm = () => {
  const { logo } = config.site;
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
    address: "",
    schoolYear: "",
    services: [],
    suggestion: "",
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const alreadySelected = prev.services.includes(service);
      return {
        ...prev,
        services: alreadySelected
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleFileInputChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Faz upload da imagem e devolve o URL público guardado pelo backend
  const uploadPhoto = async (file) => {
  const body = new FormData();
  body.append("image", file);

  const res = await fetch(UPLOAD_API_URL, {
    method: "POST",
    body,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Falha ao enviar a imagem");
  }

  const fileName = data?.image;

  if (!fileName) {
    throw new Error("O servidor não devolveu o nome da imagem");
  }

  // Se "image" já vier como URL completo, usa-o direto; senão, junta ao base path
  return fileName.startsWith("http")
    ? fileName
    : `${UPLOAD_BASE_PATH}${fileName}`;
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.services.length === 0) {
      setErrorMessage("Seleciona pelo menos uma área de serviço.");
      return;
    }

    setSubmitting(true);
    try {
      let photoUrl = "";
      if (photo) {
        photoUrl = await uploadPhoto(photo);
      }

      const payload = {
        ...formData,
        ...(photoUrl && { photoUrl }),
      };

      const res = await fetch(WAITLIST_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result?.message || "Erro ao enviar a inscrição");
      }

      setSubmitted(true);
    } catch (error) {
      setErrorMessage(error.message || "Algo correu mal. Tenta novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container-xl">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <div className="mb-6 flex justify-center [&_img]:h-14 [&_img]:w-auto">
            <Logo src={logo} />
          </div>
         
        </div>

        <div className="mx-auto max-w-xl">
          {submitted ? (
            <div className="rounded-lg border border-border-secondary p-10 text-center">
              <p className="text-lg font-semibold">Inscrição recebida 🎉</p>
              <p className="text-text-secondary mt-2">
                Obrigado
                {formData.fullName ? `, ${formData.fullName.split(" ")[0]}` : ""}.
                Vamos avisar-te por email assim que houver novidades.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-lg border border-border-secondary p-6 md:p-8"
            >
              {errorMessage && (
                <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errorMessage}
                </div>
              )}

              {/* Upload de foto — zona tracejada */}
              <div>
                <label className="text-dark mb-2 block text-sm font-medium">
                  Foto
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-border-secondary hover:border-primary"
                  }`}
                >
                  {photoPreview ? (
                    <div className="relative">
                      <Image
                        src={photoPreview}
                        alt="Pré-visualização"
                        width={120}
                        height={120}
                        className="mx-auto rounded-lg object-cover"
                        unoptimized
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto();
                        }}
                        className="text-dark mt-3 block w-full text-xs underline"
                      >
                        Remover imagem
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="text-text-secondary mb-3 h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 8.25L12 3.75m0 0L7.5 8.25M12 3.75v12"
                        />
                      </svg>
                      <p className="text-dark text-sm font-medium">
                        Clica ou arrasta uma imagem
                      </p>
                      <p className="text-text-secondary mt-1 text-xs">
                        PNG ou JPG até 5MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="text-dark mb-2 block text-sm font-medium"
                >
                  Nome completo <RequiredMark />
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="O teu nome completo"
                  className="form-input w-full rounded border border-border-secondary px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-dark mb-2 block text-sm font-medium"
                >
                  Email <RequiredMark />
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nome@exemplo.com"
                  className="form-input w-full rounded border border-border-secondary px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="birthDate"
                    className="text-dark mb-2 block text-sm font-medium"
                  >
                    Data de nascimento <RequiredMark />
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    required
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="form-input w-full rounded border border-border-secondary px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="schoolYear"
                    className="text-dark mb-2 block text-sm font-medium"
                  >
                    Ano de escolaridade <RequiredMark />
                  </label>
                  <select
                    id="schoolYear"
                    name="schoolYear"
                    required
                    value={formData.schoolYear}
                    onChange={handleChange}
                    className="form-select w-full rounded border border-border-secondary px-4 py-2 focus:border-primary focus:outline-none"
                  >
                    <option value="" disabled>
                      Seleciona o ano
                    </option>
                    {schoolYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="text-dark mb-2 block text-sm font-medium"
                >
                  Endereço <RequiredMark />
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, bairro, cidade"
                  className="form-input w-full rounded border border-border-secondary px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              {/* Multi-select de serviço — chips verdes */}
              <div>
                <label className="text-dark mb-2 block text-sm font-medium">
                  Área de serviço <RequiredMark />
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => {
                    const active = formData.services.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        aria-pressed={active}
                        className="rounded-full border px-4 py-1.5 text-sm transition-colors"
                        style={
                          active
                            ? {
                                borderColor: BRAND_GREEN,
                                backgroundColor: BRAND_GREEN,
                                color: "#fff",
                              }
                            : { borderColor: "var(--color-border-secondary, #e5e7eb)" }
                        }
                        onMouseEnter={(e) => {
                          if (!active) e.currentTarget.style.borderColor = BRAND_GREEN;
                        }}
                        onMouseLeave={(e) => {
                          if (!active)
                            e.currentTarget.style.borderColor =
                              "var(--color-border-secondary, #e5e7eb)";
                        }}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
                {formData.services.length === 0 && (
                  <p className="text-text-secondary mt-2 text-xs">
                    Seleciona pelo menos uma área
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="suggestion"
                  className="text-dark mb-2 block text-sm font-medium"
                >
                  Sugestões (opcional)
                </label>
                <textarea
                  id="suggestion"
                  name="suggestion"
                  rows={4}
                  value={formData.suggestion}
                  onChange={handleChange}
                  placeholder="Alguma coisa que gostarias de partilhar connosco?"
                  className="form-textarea w-full rounded border border-border-secondary px-4 py-2 focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || formData.services.length === 0}
                className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "A enviar..." : "Confirmar inscrição"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          Jni - Inasa, 2026
        </p>
      </div>
    </section>
  );
};

export default WaitlistForm;