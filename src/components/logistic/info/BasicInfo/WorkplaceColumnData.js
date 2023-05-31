const tableColumnsData = [{
    tableColumns: [
        {key: 'workplaceCode', label: '사업장코드', sortable: true},
        {key: 'companyCode', label: '회사코드', sortable: true},
        {key: 'workplaceName', label: '사업장명', sortable: true},
        {key: 'businessLicenseNumber', label: '사업자등록번호', sortable: true},
        {key: 'corporationLicenseNumber', label: '법인등록번호', sortable: true},
        {key: 'workplaceCeoName', label: '대표자명', sortable: true},
        {key: 'workplaceBusinessConditions', label: '업태', sortable: true},
        {key: 'workplaceBusinessItems', label: '종목', sortable: true},
    ],
    detailTableColumns: [
        {key: 'workplaceZipCode', label: '사업장우편번호', sortable: false},
        {key: 'workplaceBasicAddress', label: '사업장기본주소', sortable: true},
        {key: 'workplaceDetailAddress', label: '사업장세부주소', sortable: true},
        {key: 'workplaceTelNumber', label: '사업장전화번호', sortable: true},
        {key: 'workplaceFaxNumber', label: '사업장팩스번호', sortable: true},
        {key: 'workplaceEstablishDate', label: '사업장개업년월일', sortable: true},
        {key: 'workplaceOpenDate', label: '사업장설립년월일', sortable: true},
        {key: 'workplaceCloseDate', label: '사업장폐업년월일', sortable: true},
        {key: 'approvalStatus', label: '본점여부', sortable: true},
    ],
}]
export default tableColumnsData;
