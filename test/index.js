import chai from 'chai';
import chaiSpies from 'chai-spies';
chai.use(chaiSpies).should();
import iniFile from '../src/';
describe('iniFile', () => {

  it('returns a function', () => {
    iniFile().should.be.a('function');
  });

  describe('output function', () => {
    let process = null;
    let subFunction = null;
    beforeEach(() => {
      process = chai.spy((contents) => contents);
      subFunction = iniFile(process);
    });

    it('calls the given function when called', () => {
      subFunction('[foo]\nbar = 1');
      process.should.have.been.called(1);
    });

    it('calls the given function with the given contents as an ini', () => {
      subFunction('[foo]\nbar = baz');
      process.should.have.been.called.with.exactly({ foo: { bar: 'baz' } });
    });

    it('calls the given function with the remaining args verbatum', () => {
      subFunction('', 1, 2, 3);
      process.should.have.been.called.with.exactly({}, 1, 2, 3);
    });

    it('returns contents of process, stringified to ini format', () => {
      process = chai.spy(() => ({ foo: { bar: 'baz', bing: 'bosh' } }));
      subFunction = iniFile(process);
      subFunction('')
        .should.equal('[foo]\nbar=baz\nbing=bosh\n');
    });

    it('can add whitespace with `whitespace` option', () => {
      process = chai.spy(() => ({ foo: { bar: 'baz', bing: 'bosh' } }));
      subFunction = iniFile(process, { whitespace: true });
      subFunction('')
        .should.equal('[foo]\nbar = baz\nbing = bosh\n');
    });

  });

});
