/**
 * Public site CMS reader.
 * - CMS_SOURCE=payload → Payload Postgres (droplet /admin)
 * - default → Keystatic YAML under content/
 */
import * as keystaticCms from "./cms-keystatic";
import * as payloadCms from "./cms-payload";

const usePayload = process.env.CMS_SOURCE === "payload";
const cms = usePayload ? payloadCms : keystaticCms;

export const getCmsSite = cms.getCmsSite;
export const getCmsPageHome = cms.getCmsPageHome;
export const getCmsPageAbout = cms.getCmsPageAbout;
export const getCmsPagePillars = cms.getCmsPagePillars;
export const getCmsPageSummit = cms.getCmsPageSummit;
export const getCmsPagePartner = cms.getCmsPagePartner;
export const getCmsPageMedia = cms.getCmsPageMedia;
export const getCmsPageContact = cms.getCmsPageContact;
export const getCmsPartners = cms.getCmsPartners;
export const getCmsStats = cms.getCmsStats;
export const getCmsSpeakers = cms.getCmsSpeakers;
export const getCmsTestimonials = cms.getCmsTestimonials;
export const getCmsPillars = cms.getCmsPillars;
export const getCmsPackages = cms.getCmsPackages;
export const getCmsAgenda = cms.getCmsAgenda;
export const getCmsGallery = cms.getCmsGallery;
export const getCmsVideos = cms.getCmsVideos;
export const getCmsPress = cms.getCmsPress;
export const getCmsValues = cms.getCmsValues;
