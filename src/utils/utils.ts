import moment from 'moment'
// import 'moment-duration-format'

export const getImage = (img: any) => {
  return `${process.env.NEXT_PUBLIC_S3_BASEURL}/${img}`;
};

export const formatAccountDisplay = (account: string) => {
  if (account) {
    return `${account?.substr(0, 5)}...${account?.substr(-5, 5)}`;
  }
  return account;
};

export const toDateTime = (mils: number) =>
  moment(mils).format('HH:mm DD-MM-YYYY')

export const milToDurationTime = (mil: number) =>
  (moment.duration(mil, 'millisecond') as any)

export const toDate = (time: string) =>
  moment(time).format('dddd, MMM DD, YYYY')

export const toMonth = (time: string) => moment(time).format('MMM YYYY')

export const toMonthDate = (time: string) => moment(time).format('MMM DD, YYYY')

export const formartTime = (time: string) => moment(time).format('DD MMM YYYY')

export const generateEtherscanRootUrl = ({
  walletAddress,
  transactionHash,
  contractAddress
}: {
  walletAddress?: string
  transactionHash?: string
  contractAddress?: string
}) => {
  const etherscanMainnet = 'https://etherscan.io'
  const etherscanGoerli = 'https://goerli.etherscan.io'
  const etherscanRootUrl = etherscanGoerli

  if (contractAddress) {
    return `${etherscanRootUrl}/address/${contractAddress}`
  }

  if (walletAddress) {
    return `${etherscanRootUrl}/address/${walletAddress}`
  }

  if (transactionHash) {
    return `${etherscanRootUrl}/tx/${transactionHash}`
  }

  return etherscanRootUrl
}
