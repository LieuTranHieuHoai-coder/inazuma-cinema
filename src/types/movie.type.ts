export type Banner = {
  maBanner: number;
  maPhim: number;
  hinhAnh: string;
};

export interface DataMovieListPagination {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: Movie[];
}

export interface Movie {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}
export interface ShowMovie {
  heThongRapChieu: any[];
  maPhim:          number;
  tenPhim:         string;
  biDanh:          string;
  trailer:         string;
  hinhAnh:         string;
  moTa:            string;
  maNhom:          string;
  hot:             boolean;
  dangChieu:       boolean;
  sapChieu:        boolean;
  ngayKhoiChieu:   string;
  danhGia:         number;
}

/*rap phim*/
export interface LstRapToanQuoc {
  maHeThongRap:  string;
  tenHeThongRap: string;
  biDanh:        string;
  logo:          string;
}

export interface LstHeThongRap {
  lstCumRap:     LstCumRap[];
  maHeThongRap:  string;
  tenHeThongRap: string;
  logo:          string;
  mahom:         string;
}

export interface LstCumRap {
  danhSachPhim: DanhSachPhim[];
  maCumRap:     string;
  tenCumRap:    string;
  hinhAnh:      string;
  diaChi:       string;
}

export interface DanhSachPhim {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim:               number;
  tenPhim:              string;
  hinhAnh:              string;
  hot:                  boolean | null;
  dangChieu:            boolean | null;
  sapChieu:             boolean | null;
}

export interface LstLichChieuTheoPhim {
  maLichChieu:       number;
  maRap:             string;
  tenRap:            string;
  ngayChieuGioChieu: Date;
  giaVe:             number;
}


// cụm rạp theo mã hệ thống
export interface ListRap {
  maCumRap:    string;
  tenCumRap:   string;
  diaChi:      string;
  danhSachRap: DanhSachRap[];
}
export interface DanhSachRap {
  maRap:  number;
  tenRap: string;
}