import ini from 'ini';
export default function iniFile(process, options) {
  return (contents, ...rest) => ini.stringify(process(ini.parse(contents), ...rest), options);
}
