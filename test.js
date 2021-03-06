'use strict';

const fl = require('.');
const {Id, equality, Sum, patch} = require('./internal');
patch();

const alt = require('./laws/alt');
const alternative = require('./laws/alternative');
const applicative = require('./laws/applicative');
const apply = require('./laws/apply');
const category = require('./laws/category');
const chain = require('./laws/chain');
const chainRec = require('./laws/chainrec');
const comonad = require('./laws/comonad');
const extend = require('./laws/extend');
const filterable = require('./laws/filterable');
const foldable = require('./laws/foldable');
const functor = require('./laws/functor');
const group = require('./laws/group');
const monad = require('./laws/monad');
const monoid = require('./laws/monoid');
const ord = require('./laws/ord');
const plus = require('./laws/plus');
const semigroup = require('./laws/semigroup');
const semigroupoid = require('./laws/semigroupoid');
const setoid = require('./laws/setoid');
const traversable = require('./laws/traversable');

const test = f => t => {
  t.ok(f('x') === true);
  t.done();
};

exports.alt = {
  associativity: test(x => alt.associativity(equality)(Array[fl.zero]())([x])(Array[fl.zero]())),
  distributivity: test(x => alt.distributivity(equality)(Array[fl.zero]())([x])(a => [a])),
};

exports.alternative = {
  distributivity: test(
    x => alternative.distributivity(equality)([x])(Array[fl.zero]())([a => [a]])
  ),
  annihilation: test(
    x => alternative.annihilation(Array)(equality)([x])
  ),
};

exports.applicative = {
  identity: test(applicative.identity(Id)(equality)),
  homomorphism: test(applicative.homomorphism(Id)(equality)),
  interchange: test(applicative.interchange(Id)(equality)),
};

exports.apply = {
  composition: test(apply.composition(Id)(equality)),
};

exports.category = {
  leftIdentity: test(category.leftIdentity(x => x + 1)(equality)),
  rightIdentity: test(category.rightIdentity(x => x + 1)(equality)),
};

exports.chain = {
  associativity: test(chain.associativity(Id)(equality)),
};

exports.chainRec = {
  equivalence: test(x => {
    const predicate = a => a.length > 5;
    const done = Id[fl.of];
    const next = a => Id[fl.of](a[fl.concat]([x]));
    const initial = [x];
    return chainRec.equivalence(Id)(equality)(predicate)(done)(next)(initial);
  }),
};

exports.comonad = {
  leftIdentity: test(comonad.leftIdentity(Id[fl.of])(equality)),
  rightIdentity: test(comonad.rightIdentity(Id[fl.of])(equality)),
};

exports.extend = {
  associativity: test(extend.associativity(Id[fl.of])(equality)),
};

exports.filterable = {
  distributivity: test(x => filterable.distributivity(equality)(Id[fl.of]([0, 1, 2, 3, 4]))(x => x % 2 === 0)(x => x > 0)),
  identity: test(x => filterable.identity(equality)(Id[fl.of]([1, 2, 3]))),
  annihilation: test(x => filterable.annihilation(equality)(Id[fl.of]([1, 2, 3]))(Id[fl.of]([4, 5, 6]))),
};

exports.foldable = {
  associativity: test(foldable.associativity(Id[fl.of])(equality)),
};

exports.functor = {
  identity: test(functor.identity(Id[fl.of])(equality)),
  composition: test(functor.composition(Id[fl.of])(equality)(a => [a, a])(a => [a])),
};

exports.group = {
  rightInverse: test(() => group.rightInverse(Sum[fl.of])(equality)(42)),
  leftInverse: test(() => group.leftInverse(Sum[fl.of])(equality)(42)),
};

exports.monad = {
  leftIdentity: test(monad.leftIdentity(Id)(equality)(Id[fl.of])),
  rightIdentity: test(monad.rightIdentity(Id)(equality)),
};

exports.plus = {
  rightIdentity: test(x => plus.rightIdentity(Array)(equality)([x])),
  leftIdentity: test(x => plus.leftIdentity(Array)(equality)([x])),
  annihilation: test(x => plus.annihilation(Array)(equality)(a => [a])),
};

exports.monoid = {
  leftIdentity: test(() => monoid.leftIdentity(Sum)(equality)(23)),
  rightIdentity: test(() => monoid.rightIdentity(Sum)(equality)(23)),
};

exports.ord = {
  totality: test(() => ord.totality(equality)(Id[fl.of](1))(Id[fl.of](2))),
  antisymmetry: test(() => ord.antisymmetry(equality)(Id[fl.of](1))(Id[fl.of](1))),
  transitivity: test(() => ord.transitivity(equality)(Id[fl.of](1))(Id[fl.of](2))(Id[fl.of](3))),
};

exports.semigroup = {
  associativity: test(semigroup.associativity(Id[fl.of])(equality)),
};

exports.semigroupoid = {
  associativity: test(() => semigroupoid.associativity(x => x + 1)(x => x * x)(x => x - 2)(equality)(5)),
};

exports.setoid = {
  reflexivity: test(setoid.reflexivity(Id[fl.of])(equality)),
  symmetry: test(setoid.symmetry(Id[fl.of])(equality)),
  transitivity: test(setoid.transitivity(Id[fl.of])(equality)),
};

exports.traversable = {
  naturality: test(x => traversable.naturality(Id)(Id[fl.of])(equality)(Id[fl.of](x))),
  identity: test(traversable.identity(Id)(equality)),
  composition: test(() => traversable.composition(Id)(Id[fl.of])(equality)(Id[fl.of](Sum[fl.of](37)))),
};
