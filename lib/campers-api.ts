import type { AxiosRequestConfig } from "axios";

import { api } from "./api";

import type {
  BookingRequestBody,
  BookingRequestResponse,
  Camper,
  CamperFilters,
  CamperReview,
  CampersResponse,
  GetCampersParams,
} from "@/types/camper";

type RequestOptions = Pick<AxiosRequestConfig, "signal">;

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 4;

function removeEmptyParams(
  params: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      return value !== undefined && value !== null && value !== "";
    }),
  );
}

/**
 * Отримання списку кемперів.
 *
 * Підтримує:
 * - пагінацію;
 * - пошук за локацією;
 * - фільтрацію за типом кузова;
 * - фільтрацію за двигуном;
 * - фільтрацію за коробкою передач.
 */
export async function getCampers(
  params: GetCampersParams = {},
  options: RequestOptions = {},
): Promise<CampersResponse> {
  const requestParams = removeEmptyParams({
    page: params.page ?? DEFAULT_PAGE,
    perPage: params.perPage ?? DEFAULT_PER_PAGE,
    location: params.location?.trim(),
    form: params.form,
    engine: params.engine,
    transmission: params.transmission,
  });

  const response = await api.get<CampersResponse>("/campers", {
    params: requestParams,
    signal: options.signal,
  });

  return response.data;
}

/**
 * Отримання доступних значень фільтрів.
 */
export async function getCamperFilters(
  options: RequestOptions = {},
): Promise<CamperFilters> {
  const response = await api.get<CamperFilters>("/campers/filters", {
    signal: options.signal,
  });

  return response.data;
}

/**
 * Отримання одного кемпера за ID.
 */
export async function getCamperById(
  camperId: string,
  options: RequestOptions = {},
): Promise<Camper> {
  const normalizedId = camperId.trim();

  if (!normalizedId) {
    throw new Error("Camper ID is required");
  }

  const response = await api.get<Camper>(
    `/campers/${encodeURIComponent(normalizedId)}`,
    {
      signal: options.signal,
    },
  );

  return response.data;
}

/**
 * Отримання відгуків конкретного кемпера.
 */
export async function getCamperReviews(
  camperId: string,
  options: RequestOptions = {},
): Promise<CamperReview[]> {
  const normalizedId = camperId.trim();

  if (!normalizedId) {
    throw new Error("Camper ID is required");
  }

  const response = await api.get<CamperReview[]>(
    `/campers/${encodeURIComponent(normalizedId)}/reviews`,
    {
      signal: options.signal,
    },
  );

  return response.data;
}

/**
 * Надсилання заявки на бронювання.
 *
 * camperId передається в URL.
 * У body передаються тільки name та email.
 */
export async function createBookingRequest(
  camperId: string,
  body: BookingRequestBody,
  options: RequestOptions = {},
): Promise<BookingRequestResponse> {
  const normalizedId = camperId.trim();
  const normalizedName = body.name.trim();
  const normalizedEmail = body.email.trim();

  if (!normalizedId) {
    throw new Error("Camper ID is required");
  }

  if (!normalizedName) {
    throw new Error("Name is required");
  }

  if (!normalizedEmail) {
    throw new Error("Email is required");
  }

  const response = await api.post<BookingRequestResponse>(
    `/campers/${encodeURIComponent(normalizedId)}/booking-requests`,
    {
      name: normalizedName,
      email: normalizedEmail,
    },
    {
      signal: options.signal,
    },
  );

  return response.data;
}