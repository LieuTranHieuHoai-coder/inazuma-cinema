import { PAGE_SIZE, MANHOM } from "../constants";
import { Banner, DataMovieListPagination, ListRap, LstHeThongRap, LstRapToanQuoc, Movie, ShowMovie } from "../types/movie.type";
import { ResponseApi } from "../types/util";
import api from "./apiUtil";

export const getBannerMovieApi = async () => {
  try {
    const response = await api.get<ResponseApi<Banner[]>>(
      "/QuanLyPhim/LayDanhSachBanner"
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
export const addMovieApi = async (payload: FormData) => {
  try {
    const response = await api.post("/QuanLyPhim/ThemPhimUploadHinh", payload);
    return response.data.content;
  } catch (error) {
    throw "Lỗi rồi";
  }
};
export const getListMovieApi = async (currentPage: number) => {
  try {
    const response = await api.get<ResponseApi<DataMovieListPagination>>(
      `/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=${MANHOM}&soTrang=${currentPage}&soPhanTuTrenTrang=${PAGE_SIZE}`
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
};
export const getThongTinLichChieuHeThongRap = async (maHeThongRap:string, maNhom:string) => {
  try {
    const response = await api.get<ResponseApi<LstHeThongRap>>(
      `/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${MANHOM}`
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
}
export const getThongTinHeThongRap = async () => {
  try {
    const response = await api.get<ResponseApi<LstRapToanQuoc[]>>(
      "/QuanLyRap/LayThongTinHeThongRap"
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
}
export const getThongTinCumRapTheoHeThong = async (marap:string) => {
  try {
    const response = await api.get<ResponseApi<ListRap[]>>(
      "/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=" + marap
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
}
export const getThongTinPhim = async (maphim:string) => {
  try {
    const response = await api.get<ResponseApi<Movie>>(
      "/QuanLyPhim/LayThongTinPhim?MaPhim=" + maphim
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
}
export const getThongTinLichChieuPhim = async (maphim:string) => {
  try {
    const response = await api.get<ResponseApi<ShowMovie>>(
      "QuanLyRap/LayThongTinLichChieuPhim?MaPhim=" + maphim
    );
    return response.data.content;
  } catch (error: any) {
    throw Error(error);
  }
}